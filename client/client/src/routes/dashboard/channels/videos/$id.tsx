import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  ThumbsUp,
  MessageSquare,
  Eye,
  Clock,
  TrendingUp,
  BarChart3,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const Route = createFileRoute("/dashboard/channels/videos/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const [timePeriod, setTimePeriod] = useState("7days");

  // In a real app, you would fetch the video data based on the ID
  const videoId = "placeholder-id";

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard/channels/videos">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Videos
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-4">
          <div className="h-[300px] md:h-[400px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            Video Player
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold" suppressHydrationWarning>
              How to Grow Your YouTube Channel in 2023
            </h1>
            <div
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>120,345 views</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>8,432 likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>542 comments</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Published on June 15, 2023</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-4 w-4" />
              View on YouTube
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                In this video, I share my top strategies for growing a YouTube
                channel in 2023. These are the exact methods I used to grow from
                0 to 100K subscribers in just 12 months.
                <br />
                <br />
                🔔 Subscribe for more tips: https://youtube.com/channel/example
                <br />
                <br />
                ⏱️ Timestamps:
                <br />
                00:00 Introduction
                <br />
                01:23 Strategy #1: Content Research
                <br />
                05:47 Strategy #2: Thumbnail Optimization
                <br />
                10:32 Strategy #3: Title and Description SEO
                <br />
                15:18 Strategy #4: Audience Retention
                <br />
                20:05 Strategy #5: Promotion Tactics
                <br />
                <br />
                📱 Follow me on social media:
                <br />
                Instagram: https://instagram.com/example
                <br />
                Twitter: https://twitter.com/example
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Analytics</h2>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="28days">Last 28 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="lifetime">Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120,345</div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15.2% vs. previous period</span>
                </div>
                <div className="mt-2 h-[60px] w-full bg-muted/20 rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Watch Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,432 hours</div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.8% vs. previous period</span>
                </div>
                <div className="mt-2 h-[60px] w-full bg-muted/20 rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Audience Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54.7%</div>
                <div className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>+3.2% vs. previous period</span>
                </div>
                <div className="mt-2 h-[60px] w-full bg-muted/20 rounded-md" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">YouTube search</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: "42%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suggested videos</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "28%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">External</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "15%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Browse features</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: "10%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-500"
                      style={{ width: "5%" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="w-full gap-1">
            <BarChart3 className="h-4 w-4" />
            View Full Analytics
          </Button>
        </div>
      </div>

      <Tabs defaultValue="comments" className="mt-8">
        <TabsList>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="cards">Cards & End Screens</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Comments</CardTitle>
              <CardDescription>542 comments on this video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">User{i}</span>
                        <span className="text-xs text-muted-foreground">
                          {i} day{i !== 1 ? "s" : ""} ago
                        </span>
                      </div>
                      <p className="text-sm">
                        {i === 1
                          ? "This video was incredibly helpful! I've been trying to grow my channel for months and these strategies are exactly what I needed."
                          : i === 2
                            ? "Great tips! I especially liked the section on thumbnail optimization. Made some changes and already seeing better CTR."
                            : i === 3
                              ? "Question: How often should I be posting to maximize growth?"
                              : i === 4
                                ? "Just found your channel and I'm binge watching all your content. Your advice is gold!"
                                : "I implemented your Strategy #3 and my views increased by 40% in just two weeks. Thank you so much!"}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{50 - i * 8}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cards & End Screens</CardTitle>
              <CardDescription>
                Interactive elements in your video
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Cards</h3>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 border rounded-md"
                      >
                        <div className="h-16 w-28 bg-muted rounded-md flex items-center justify-center text-xs">
                          Card Image
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="font-medium">
                            {i === 1
                              ? "YouTube SEO Guide"
                              : "Channel Subscription Card"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i === 1
                              ? "Link to related video"
                              : "Subscribe prompt"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Appears at {i === 1 ? "05:23" : "12:47"}
                          </p>
                        </div>
                        <div className="text-sm">
                          <div>CTR: {i === 1 ? "4.2%" : "2.8%"}</div>
                          <div>Clicks: {i === 1 ? "843" : "562"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">End Screen</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 border rounded-md"
                      >
                        <div className="h-16 w-28 bg-muted rounded-md flex items-center justify-center text-xs">
                          Element Image
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="font-medium">
                            {i === 1
                              ? "Subscribe Button"
                              : i === 2
                                ? "Next Video: Thumbnail Design Tips"
                                : "Playlist: YouTube Growth Series"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i === 1
                              ? "Channel subscription element"
                              : i === 2
                                ? "Video element"
                                : "Playlist element"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: 20 seconds (at end of video)
                          </p>
                        </div>
                        <div className="text-sm">
                          <div>
                            CTR: {i === 1 ? "3.5%" : i === 2 ? "8.2%" : "5.4%"}
                          </div>
                          <div>
                            Clicks:{" "}
                            {i === 1 ? "702" : i === 2 ? "1,640" : "1,080"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Who is watching your video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Age and Gender</h3>
                  <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                    Age and Gender Chart
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Geography</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>United States</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "42%" }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>United Kingdom</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: "15%" }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Canada</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: "12%" }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Australia</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: "8%" }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Other</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500"
                        style={{ width: "23%" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Devices</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-center p-4 border rounded-md">
                      <div className="text-2xl font-bold">58%</div>
                      <div className="text-sm text-muted-foreground">
                        Mobile
                      </div>
                    </div>
                    <div className="space-y-1 text-center p-4 border rounded-md">
                      <div className="text-2xl font-bold">32%</div>
                      <div className="text-sm text-muted-foreground">
                        Desktop
                      </div>
                    </div>
                    <div className="space-y-1 text-center p-4 border rounded-md">
                      <div className="text-2xl font-bold">8%</div>
                      <div className="text-sm text-muted-foreground">
                        Tablet
                      </div>
                    </div>
                    <div className="space-y-1 text-center p-4 border rounded-md">
                      <div className="text-2xl font-bold">2%</div>
                      <div className="text-sm text-muted-foreground">TV</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
