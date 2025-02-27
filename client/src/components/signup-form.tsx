import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up to Hive</CardTitle>
					<CardDescription>
						Enter your email and a password to create a new account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									hidden
									placeholder="Ssh! Super secret password!"
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Confirm Password</Label>
								</div>
								<Input
									id="password"
									type="password"
									required
									placeholder="Same password again!"
								/>
							</div>
							<Button type="submit" className="w-full">
								Create Account
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Have an account already ?{" "}
							<a href="/login" className="underline underline-offset-4">
								Log In
							</a>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
