import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/otp/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/register/otp/"!</div>;
}
