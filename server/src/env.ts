import { z } from "zod";
import dotnev from "dotenv";
dotnev.config();

export const EnvSchema = z.object({
	// For Express
	NODE_ENVIRONMENT: z
		.enum(["development", "test", "production"])
		.default("development"),
	PORT: z.coerce
		.number({
			description: ".env",
		})
		.positive()
		.max(65535, `Options.port shoudl be >= 0 and < 65535`)
		.default(3000),

	// For Databases
	DATABASE_URL: z
		.string({
			description: "PostgreSQL Connection string",
			required_error: "You forgot to provide a database URL",
		})
		.url()
		.min(10),

	// For Google oAuth
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GOOGLE_CALLBACK_URL: z.string().url(),

	// Authentication secret
	TOKEN_SECRET: z.string(),
});

export type TEnvSchema = z.infer<typeof EnvSchema>;

const env = EnvSchema.safeParse(process.env);
if (!env.success) {
	process.exit(1);
}

export const Env = env.data;
