import { Link, createFileRoute } from "@tanstack/react-router";

import { Plus, Youtube } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export const Route = createFileRoute("/dashboard/channels/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">YouTube Channels</h2>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Connect Channel
        </Button>
      </div>

      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Main Channel", subscribers: "132K", videos: 87 },
              { name: "Second Channel", subscribers: "45K", videos: 32 },
            ].map((channel, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle>{channel.name}</CardTitle>
                      <CardDescription>
                        {channel.subscribers} subscribers
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Videos</p>
                      <p className="text-xl font-bold">{channel.videos}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="text-xl font-bold">
                        {i === 0 ? "1.2M" : "450K"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Watch Time
                      </p>
                      <p className="text-xl font-bold">
                        {i === 0 ? "45K hrs" : "12K hrs"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Engagement
                      </p>
                      <p className="text-xl font-bold">
                        {i === 0 ? "24.8%" : "18.3%"}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Connect a new channel
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Add another YouTube channel to your dashboard
              </p>
              <Button>Connect with YouTube</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Videos</CardTitle>
                  <CardDescription>
                    Videos from all your connected channels
                  </CardDescription>
                </div>
                <Link href="/dashboard/channels/videos">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="h-20 w-36 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                      Thumbnail
                    </div>
                    <div className="space-y-1 flex-1">
                      <Link
                        href={`/dashboard/channels/videos/${i}`}
                        className="hover:underline"
                      >
                        <h4 className="text-base font-medium">
                          {i === 1
                            ? "How to Grow Your YouTube Channel in 2023"
                            : i === 2
                              ? "10 Tips for Better Video Quality"
                              : i === 3
                                ? "YouTube Algorithm Explained"
                                : i === 4
                                  ? "Best Camera Settings for YouTube"
                                  : "How I Got 100K Subscribers"}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{120000 - i * 20000} views</span>
                        <span>•</span>
                        <span>
                          {i} {i === 1 ? "day" : "days"} ago
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-xs">
                            {i === 1
                              ? "+12%"
                              : i === 2
                                ? "+8%"
                                : i === 3
                                  ? "+5%"
                                  : i === 4
                                    ? "+3%"
                                    : "+1%"}{" "}
                            views
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span className="text-xs">
                            {i === 1
                              ? "4.8"
                              : i === 2
                                ? "4.6"
                                : i === 3
                                  ? "4.7"
                                  : i === 4
                                    ? "4.5"
                                    : "4.4"}{" "}
                            rating
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/channels/videos/${i}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Permissions</CardTitle>
              <CardDescription>
                Manage who has access to which channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    channel: "Main Channel",
                    permissions: [
                      {
                        user: "You (Owner)",
                        role: "Admin",
                        access: "Full access",
                      },
                      {
                        user: "John Doe",
                        role: "Editor",
                        access: "Can edit videos and settings",
                      },
                      {
                        user: "Mary Taylor",
                        role: "Viewer",
                        access: "Can view analytics only",
                      },
                    ],
                  },
                  {
                    channel: "Second Channel",
                    permissions: [
                      {
                        user: "You (Owner)",
                        role: "Admin",
                        access: "Full access",
                      },
                      {
                        user: "John Doe",
                        role: "Viewer",
                        access: "Can view analytics only",
                      },
                    ],
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="font-medium">{item.channel}</h4>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                        <div>User</div>
                        <div>Role</div>
                        <div>Access</div>
                      </div>
                      {item.permissions.map((perm, j) => (
                        <div
                          key={j}
                          className="grid grid-cols-3 gap-4 p-4 border-b last:border-0"
                        >
                          <div>{perm.user}</div>
                          <div>{perm.role}</div>
                          <div className="text-sm text-muted-foreground">
                            {perm.access}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Manage Permissions</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
