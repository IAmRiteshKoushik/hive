import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/team/invite")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/dashboard/team/invite"!</div>;
}
