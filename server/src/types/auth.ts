import z from "zod";

export const VUsernameAvailable = z.object({
  username: z
    .string()
    .trim()
    .min(5)
    .regex(/^[a-zA-Z0-9_.]+$/),
});

export const VUserLogin = z.object({
  username: z
    .string()
    .trim()
    .min(5)
    .regex(/^[a-zA-Z0-9_.]+$/),
  password: z.string().min(8).max(30).regex(new RegExp("^[a-zA-Z0-9_]*$")),
});

export const VUserRegister = z.object({
  email: z.string().trim().max(320).email(),
  username: z
    .string()
    .trim()
    .min(5)
    .max(32)
    .regex(/^[a-zA-Z0-9_.]+$/),
  password: z
    .string()
    .trim()
    .min(8)
    .max(30)
    .regex(/^[a-zA-Z0-9]*$/),
});

export const VUserRegistrationOtp = z.object({
  username: z
    .string()
    .trim()
    .min(5)
    .regex(/^[a-zA-Z0-9_.]+$/),
  email: z.string().trim().email(),
  otp: z
    .string()
    .trim()
    .length(6)
    .regex(/^[0-9]+$/),
});

export const VUserResendOTP = z.object({
  username: z
    .string()
    .trim()
    .min(5)
    .regex(/^[a-zA-Z0-9_.]+$/),
  email: z.string().trim().email(),
});
