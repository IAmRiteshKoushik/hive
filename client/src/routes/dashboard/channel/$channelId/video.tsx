import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/channel/$channelId/video")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/dashboard/channel/$channelId/video"!</div>;
}
