import { Router, Request, Response } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.post("/login", LoginUser);
authRouter.post("/register", RegisterUser);
authRouter.post("/register/otp/verify", authMiddleware, VerifyUserOTP);
authRouter.post("/register/otp/resend", authMiddleware, ResendUserOTP);

authRouter.post("/check/username", checkUsernameAvailability);

authRouter.get("/google", passport.authenticate("google", {
  failureRedirect: "/login",
}), async (req: Request, res: Response) => {

})

authRouter.post("/google",)
authRouter.post("/google/callback",)

export default authRouter;
