import nodemailer from "nodemailer";
import RegistrationOTPTemplate from "./templates/user_registration";
import { config } from "dotenv";

config({ path: ".env" });

const mailHost = process.env.EMAIL_HOST as string;
const mailUser = process.env.EMAIL_ID as string;
const mailPass = process.env.EMAIL_APP_KEY as string;

// To be generalized later
const subjects = {
	registration: "Eventr - Registration: OTP",
	passReset: "Eventr - Password Reset: OTP",
	accountDelete: "Eventr - Account Delete: OTP",
};

const transporter = nodemailer.createTransport({
	service: mailHost,
	secure: true,
	auth: {
		user: mailUser,
		pass: mailPass,
	},
	tls: {
		rejectUnauthorized: true,
	},
});

export type MailArgs = {
	username: string;
	otp: string;
	email: string;
};

export const MailRegistrationOTP = async ({
	username,
	otp,
	email,
}: MailArgs): Promise<boolean> => {
	const mailOptions = {
		from: {
			name: "Eventr",
			address: mailUser,
		},
		to: email,
		subject: subjects.registration + " - " + Date.now(),
		html: RegistrationOTPTemplate(username, otp),
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		// FIX: Setup a logger which handled the type of error
		return false;
	}
	return true;
};
