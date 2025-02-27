import passport, { Profile } from "passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { VGoogleOAuthValidator } from "./types/auth";
import { CustomError } from "../errors";
import { Env } from "../env";

const googleClientId = Env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = Env.GOOGLE_CLIENT_SECRET || "";
const googleCallbackURL = Env.GOOGLE_CALLBACK_URL || "";

passport.use(
  new Strategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL,
    },
    async function verify(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) {
      // @ts-ignore
      // Google specific behavious where the entire data is sent in multiple 
      // and one of them being _json
      const validProfile = VGoogleOAuthValidator.safeParse(profile._json);
      if (!validProfile.success) {
        return done(new CustomError(400, "Invalid Profile details"), false);
      }

      // User has already linked Google oAuth with Eventr
      // But it can also be unlinked
      if (_refreshToken === undefined) {
        const pf: Express.User = {
          firstName: validProfile.data.given_name,
          lastName: validProfile.data.family_name,
          picture: validProfile.data.picture,
          email: validProfile.data.email
        }
        return done(null, pf);
      }

      // User has not authenticated Eventr with Google oAuth
      try {
        await prisma.$transaction(async (tx) => {
          const [uname] = validProfile.data.email.split("@");
          const newUser = await tx.user.create({
            data: {
              username: uname,
              provider: "Google",
              providerId: validProfile.data.sub,
              firstName: validProfile.data.given_name,
              lastName: validProfile.data.family_name,
              email: validProfile.data.email,
              profilePictureURL: validProfile.data.picture
            },
            select: {
              username: true,
              firstName: true,
              middleName: true,
              lastName: true,
              email: true,
              profilePictureURL: true
            }
          });
          return done(null, newUser);
        });
      } catch (error: any) {
        // TODO: Log the error
        return done(new CustomError(error.statusCode, error.message), false);
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
