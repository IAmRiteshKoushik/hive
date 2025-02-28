import { Request, Response } from "express";
import {
  VUserLogin,
  VUsernameAvailable,
  VUserRegistrationOtp,
  VUserRegister,
  VUserResendOTP
} from "../types/auth";
import prisma from "../db";
import { createToken, tempToken } from "../middleware/token";
import { newHash } from "../encryption/hash";
import { generateOTP } from "../middleware/otp";
import { CustomError } from "../errors";
import { MailArgs, MailRegistrationOTP } from "../mailer";

export const LoginUser = async (req: Request, res: Response) => {
  const validBody = VUserLogin.safeParse(req.body);
  if (!validBody.success) {
    res.status(400).json({
      message: "Some fields are missing in the request body",
    });
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: validBody.data.username,
        password: newHash(validBody.data.password),
        accountStatus: "Active"
      }
    });
    if (!user) {
      res.status(401).json({
        message: "Username or password is invalid"
      });
      return;
    }

    const token = await createToken(user.email);
    return res.status(200).json({
      message: "Login successful",
      username: user.username,
      token: token,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Please try after some time."
    });
  }
}

export const RegisterUser = async (req: Request, res: Response) => {
  const validBody = VUserRegister.safeParse(req.body);
  if (!validBody.success) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }

  const details: MailArgs = {
    username: "",
    otp: "",
    email: "",
  }

  try {
    await prisma.$transaction(async (tx) => {
      const userExist = await tx.user.findFirst({
        where: {
          accountStatus: "Active",
          OR: [{
            username: validBody.data.username,
          },
          {
            email: validBody.data.email,
          }]
        }
      });
      if (userExist) {
        res.status(409).json({
          message: "Username or email have already been taken",
        });
        throw new CustomError(409, "Account already exists");
      }

      const existRegistration = await tx.registration.findFirst({
        where: {
          OR: [{
            username: validBody.data.username,
          }, {
            email: validBody.data.email,
          }],
          expiryAt: {
            gt: new Date().toISOString(),
          }
        }
      });
      if (existRegistration) {
        res.status(303).json({
          message: "Redirect to OTP",
        });
        throw new CustomError("Account registration already underway");
      }

      const creation = new Date();
      creation.setMinutes(creation.getMinutes() + 5);
      const newUser = await tx.registration.create({
        data: {
          username: validBody.data.username,
          email: validBody.data.email,
          password: newHash(validBody.data.password),
          otp: generateOTP(),
          expiryAt: creation.toISOString(),
        }
      });

      details.username = newUser.username;
      details.otp = newUser.otp;
      details.email = newUser.email;

      res.status(200).json({
        message: "OTP send to registered email",
        username: newUser.username,
        email: newUser.email,
        tempToken: await tempToken(newUser.email),
        expiryAt: newUser.expiryAt,
      });
    });

    const mailConfirm = await MailRegistrationOTP(details);
    if (!mailConfirm) {
      // FIX: Setup logs in-case of mail failures
      console.log("Mail sending failed");
    }
    return;

  } catch (error) {
    if (error instanceof CustomError) {
      return;
    }
    res.status(500).json({
      message: "Please try again in a while",
    });
    return;
  }
}

export const VerifyUserOTP = async (req: Request, res: Response) => {
  /*
   * Check the OTP against all recently requested OTPs (user can choose to resend)
   * If any of the checks pass then move to registration else move to error
   */
  const validBody = VUserRegistrationOtp.safeParse(req.body);
  if (!validBody.success) {
    res.status(400).json({});
    return;
  }

  try {
    await prisma.$transaction(async (tx) => {

      // TODO: Make sure that the user is not already registered
      const verifyOTP = await tx.registration.findFirst({
        where: {
          username: validBody.data.username,
          email: validBody.data.email,
          otp: validBody.data.otp,
          expiryAt: {
            gt: new Date().toISOString(),
          }
        }
      });
      if (!verifyOTP) {
        res.status(401).json({
          message: "OTP invalid"
        });
        throw new CustomError("Invalid OTP Provided");
      }

      await tx.registration.deleteMany({
        where: {
          username: validBody.data.username,
        }
      });

      const newUser = await tx.user.create({
        data: {
          username: verifyOTP.username,
          email: verifyOTP.email,
          password: verifyOTP.password,
        }
      });
      const token = await createToken(newUser.email);
      res.status(200).json({
        token: token,
        message: "Registration successful",
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName as string,
        middleName: newUser.middleName as string,
        lastName: newUser.lastName as string,
        profilePictureURL: newUser.profilePictureURL as string,
        phoneNumber: newUser.phoneNumber as string,
        city: newUser.city as string,
        accountStatus: "Active",
      });
    });
    return;

  } catch (error) {
    if (error instanceof CustomError) {
      return;
    }
    res.status(500).json({
      message: "Please try after some time"
    })
    return;
  }
}

export const ResendUserOTP = async (req: Request, res: Response) => {
  /*
   * If the user has less than 5 resends done then, a new record is generated 
   * and another mail is send otherwise ask the user to try after 5 minutes.
   */

  const validBody = VUserResendOTP.safeParse(req.body);
  if (!validBody.success) {
    res.status(400).json({})
    return;
  }

  let details: MailArgs = {
    username: "",
    otp: "",
    email: "",
  }

  try {
    await prisma.$transaction(async (tx) => {
      const requests = await tx.registration.findMany({
        where: {
          username: validBody.data.username,
          email: validBody.data.email,
          expiryAt: {
            gt: new Date().toISOString(),
          }
        }
      });
      if (requests.length === 0) {
        res.status(408).json({
          message: "Retry registration"
        });
        throw new CustomError("Time elapsed for all requests");
      }
      if (requests.length === 5) {
        res.status(429).json({
          message: "Too many reattempts. Try later."
        });
        throw new CustomError("Too many reattempts");
      }

      const creation = new Date();
      creation.setMinutes(creation.getMinutes() + 5);
      const newRequest = await tx.registration.create({
        data: {
          username: requests[0].username,
          password: requests[0].password,
          email: requests[0].email,
          otp: generateOTP(),
          expiryAt: creation.toISOString(),
        }
      });

      details.username = requests[0].username;
      details.otp = requests[0].otp;
      details.email = requests[0].email;

      res.status(200).json({
        message: "OTP resent to registered email",
        username: newRequest.username,
        email: newRequest.email,
        tempToken: await tempToken(newRequest.email),
        expiryAt: newRequest.expiryAt,
      });

      // TODO: Migrate to SES Mail

      const mailConfirm = await MailRegistrationOTP(details);
      if (!mailConfirm) {
        // FIX: Setup logs in-case of mail failures
      }
      return;
    });

  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      message: "Pleae retry after some time."
    });
    return;
  }
}

export const checkUsernameAvailability = async (req: Request, res: Response) => {
  /*
   * Check the user table and the registration table. If a user is registered or 
   * under registration then declare unavailable
   */

  const validBody = VUsernameAvailable.safeParse(req.body);
  if (!validBody.success) {
    return res.status(400).json({
      message: "Bad Request"
    });
  }

  // TODO: Is is possible to bring both these operations within a single query
  // That way, we can save on the number of database calls using JOINS.
  try {
    const userExist = await prisma.user.findFirst({
      where: {
        username: validBody.data.username,
        accountStatus: "Active"
      }
    });
    if (userExist) {
      res.status(409).json({
        available: false,
        message: "Username unavailable",
      });
      return;
    }

    const underRegistration = await prisma.registration.findFirst({
      where: {
        username: validBody.data.username,
        expiryAt: {
          gt: new Date().toISOString(),
        }
      }
    });
    if (underRegistration) {
      res.status(409).json({
        available: false,
        message: "Username unavailable"
      });
      return;
    }
    res.status(200).json({
      available: true,
      message: "Username available"
    });
    return;

  } catch (error) {
    res.status(500).json({
      message: "Please try after some time."
    });
    return;
  }
}
