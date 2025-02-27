import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/channel/$channelId/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/dashboard/channel/$channelId/"!</div>;
}
