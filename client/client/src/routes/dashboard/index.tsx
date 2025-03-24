import { Link, createFileRoute } from "@tanstack/react-router";
import { Users, Clock, ThumbsUp, Eye, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { DashboardNav } from "../../components/dashboard-nav";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="md:w-64 md:border-r md:min-h-screen">
        <DashboardNav />
      </aside>
      <main className="flex-1">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="7days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="12months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245,678</div>
                <p
                  className="text-xs text-muted-foreground"
                  suppressHydrationWarning
                >
                  +20.1% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Watch Time (hours)
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,271</div>
                <p
                  className="text-xs text-muted-foreground"
                  suppressHydrationWarning
                >
                  +12.5% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscribers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">132,456</div>
                <p
                  className="text-xs text-muted-foreground"
                  suppressHydrationWarning
                >
                  +4.3% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.8%</div>
                <p
                  className="text-xs text-muted-foreground"
                  suppressHydrationWarning
                >
                  +1.2% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                  Performance Chart Placeholder
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Videos</CardTitle>
                <CardDescription>Your best performing videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-12 w-20 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                        Thumbnail
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          How to Grow Your YouTube Channel in 2023
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {120000 - i * 20000} views • {i} days ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/channels">
                  <Button variant="outline" size="sm">
                    View all videos
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Channels</CardTitle>
                <CardDescription>
                  Manage your connected YouTube channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        CH
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 1 ? "Main Channel" : "Second Channel"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1 ? "132K" : "45K"} subscribers
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/channels">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Connect Channel
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage your team and their access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        {i === 1 ? "YS" : i === 2 ? "JD" : "MT"}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 1
                            ? "You (Owner)"
                            : i === 2
                              ? "John Doe"
                              : "Mary Taylor"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1 ? "Admin" : i === 2 ? "Editor" : "Viewer"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/team">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Invite Member
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest actions on your channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <p className="text-sm">
                          {i === 1
                            ? "New video published: 'Top 10 Tips'"
                            : i === 2
                              ? "John Doe edited channel settings"
                              : i === 3
                                ? "Reached 130K subscribers milestone"
                                : "New comment trend detected"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i} {i === 1 ? "hour" : "hours"} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
