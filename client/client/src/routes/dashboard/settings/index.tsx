import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react"
import { Youtube, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "../../../components/ui/switch";
import { useToast } from "../../../hooks/use-toast";

export const Route = createFileRoute("/dashboard/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("Your Name")
  const [email, setEmail] = useState("you@example.com")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    }, 1000)
  }

  const handleSavePassword = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      })
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been updated successfully",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-11">UTC-11:00</SelectItem>
                    <SelectItem value="utc-10">UTC-10:00</SelectItem>
                    <SelectItem value="utc-9">UTC-09:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                    <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                    <SelectItem value="utc-4">UTC-04:00</SelectItem>
                    <SelectItem value="utc-3">UTC-03:00</SelectItem>
                    <SelectItem value="utc-2">UTC-02:00</SelectItem>
                    <SelectItem value="utc-1">UTC-01:00</SelectItem>
                    <SelectItem value="utc">UTC+00:00</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00</SelectItem>
                    <SelectItem value="utc+2">UTC+02:00</SelectItem>
                    <SelectItem value="utc+3">UTC+03:00</SelectItem>
                    <SelectItem value="utc+4">UTC+04:00</SelectItem>
                    <SelectItem value="utc+5">UTC+05:00</SelectItem>
                    <SelectItem value="utc+5:30">UTC+05:30 (India)</SelectItem>
                    <SelectItem value="utc+6">UTC+06:00</SelectItem>
                    <SelectItem value="utc+7">UTC+07:00</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00</SelectItem>
                    <SelectItem value="utc+9">UTC+09:00</SelectItem>
                    <SelectItem value="utc+10">UTC+10:00</SelectItem>
                    <SelectItem value="utc+11">UTC+11:00</SelectItem>
                    <SelectItem value="utc+12">UTC+12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePassword} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Protect your account with an additional security layer.
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Deletion</CardTitle>
              <CardDescription>Permanently delete your account and all associated data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. All your data, including team members, channel
                connections, and analytics will be permanently removed.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">Delete Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Channel Performance Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Receive weekly performance summaries for your channels.
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Video Performance Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when a video performs exceptionally well or poorly.
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Team Activity</div>
                      <div className="text-sm text-muted-foreground">Notifications about team member actions.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Product Updates</div>
                      <div className="text-sm text-muted-foreground">Learn about new features and improvements.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notification Frequency</h3>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Email Digest Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for integrating with other services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Your API Key</div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Key className="h-4 w-4" />
                    Generate New Key
                  </Button>
                </div>
                <div className="flex">
                  <Input value="••••••••••••••••••••••••••••••" readOnly className="rounded-r-none" />
                  <Button variant="secondary" className="rounded-l-none">
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This key provides access to your TubeMetrics data. Keep it secure and never share it publicly.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage third-party services connected to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">YouTube</div>
                      <div className="text-sm text-muted-foreground">Connected on June 15, 2023</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="text-blue-600 font-bold">GA</div>
                    </div>
                    <div>
                      <div className="font-medium">Google Analytics</div>
                      <div className="text-sm text-muted-foreground">Not connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Set up webhooks to receive real-time updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-app.com/webhooks/tubemetrics" />
              </div>
              <div className="space-y-2">
                <Label>Events to Send</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="video-published" />
                    <Label htmlFor="video-published">Video Published</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="milestone-reached" />
                    <Label htmlFor="milestone-reached">Milestone Reached</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="performance-alert" />
                    <Label htmlFor="performance-alert">Performance Alert</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Webhook</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



export default function SettingsPage() {
}

