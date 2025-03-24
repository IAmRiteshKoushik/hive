import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Youtube,
  ArrowRight,
  Check,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useToast } from "../../../hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/connect/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [channels, setChannels] = useState<any[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnectYouTube = () => {
    setIsConnecting(true);

    // In a real app, this would redirect to the YouTube OAuth flow
    // For demo purposes, we'll simulate the OAuth process

    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);

      // Mock channels data
      setChannels([
        {
          id: "UC123",
          name: "Main Channel",
          subscribers: "132K",
          videos: 87,
          thumbnail: "/placeholder.svg?height=50&width=50",
        },
        {
          id: "UC456",
          name: "Second Channel",
          subscribers: "45K",
          videos: 32,
          thumbnail: "/placeholder.svg?height=50&width=50",
        },
        {
          id: "UC789",
          name: "Gaming Channel",
          subscribers: "12K",
          videos: 18,
          thumbnail: "/placeholder.svg?height=50&width=50",
        },
      ]);

      toast({
        title: "YouTube account connected",
        description: "Your YouTube account has been successfully connected.",
      });
    }, 2000);
  };

  const handleToggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(selectedChannels.filter((id) => id !== channelId));
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
    }
  };

  const handleFinish = () => {
    if (selectedChannels.length === 0) {
      toast({
        title: "No channels selected",
        description: "Please select at least one channel to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Channels connected",
      description: `${selectedChannels.length} channel(s) have been connected to your account.`,
    });

    navigate({ to: "/dashboard/channels" });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Connect YouTube Channel
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect Your YouTube Account</CardTitle>
          <CardDescription>
            Connect your YouTube account to manage your channels and videos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="rounded-lg border p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <Youtube className="h-8 w-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">YouTube Account</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your YouTube account to access your channels, videos,
                  and analytics.
                </p>
              </div>
              <Button
                onClick={handleConnectYouTube}
                className="gap-2"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect YouTube Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Youtube className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">YouTube Account Connected</p>
                  <p className="text-sm text-muted-foreground">
                    Select the channels you want to manage with TubeMetrics
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Available Channels</h3>
                <div className="space-y-3">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedChannels.includes(channel.id)
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => handleToggleChannel(channel.id)}
                    >
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {channel.subscribers} subscribers • {channel.videos}{" "}
                          videos
                        </p>
                      </div>
                      <div
                        className={`h-6 w-6 rounded-full border flex items-center justify-center ${
                          selectedChannels.includes(channel.id)
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedChannels.includes(channel.id) && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-dashed p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      What permissions will be granted?
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                      <li>
                        Read access to your YouTube channel data and analytics
                      </li>
                      <li>
                        Ability to upload videos to your channel (with your
                        approval)
                      </li>
                      <li>Manage your YouTube channel settings</li>
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      You can revoke access at any time from your YouTube
                      account settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/dashboard/channels">Cancel</Link>
          </Button>
          {isConnected && (
            <Button
              onClick={handleFinish}
              disabled={selectedChannels.length === 0}
            >
              Connect Selected Channels
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
