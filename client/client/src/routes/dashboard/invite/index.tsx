import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Copy, Check, X, AlertCircle } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useToast } from "../../../hooks/use-toast";

export const Route = createFileRoute("/dashboard/invite/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { toast } = useToast();

  // Mock pending invitations
  const [pendingInvitations, setPendingInvitations] = useState([
    {
      id: 1,
      email: "john@example.com",
      role: "editor",
      sentAt: "2023-06-13",
      status: "pending",
    },
    {
      id: 2,
      email: "sarah@example.com",
      role: "viewer",
      sentAt: "2023-06-14",
      status: "pending",
    },
  ]);

  const handleSendInvitation = () => {
    if (!email) return;

    setIsSending(true);

    // In a real app, you would send an API request to send the invitation
    setTimeout(() => {
      const newInvitation = {
        id: pendingInvitations.length + 1,
        email,
        role,
        sentAt: "2023-06-15", // Use current date in a real app
        status: "pending",
      };

      setPendingInvitations([...pendingInvitations, newInvitation]);
      setEmail("");
      setMessage("");
      setIsSending(false);

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${email}`,
      });
    }, 1500);
  };

  const handleCopyLink = () => {
    // In a real app, you would copy the link to the clipboard
    navigator.clipboard.writeText(
      "https://tubemetrics.app/invite/team/abc123xyz",
    );

    setIsLinkCopied(true);

    toast({
      title: "Link copied",
      description: "Invitation link has been copied to clipboard",
    });

    setTimeout(() => {
      setIsLinkCopied(false);
    }, 3000);
  };

  const handleCancelInvitation = (id: number) => {
    setPendingInvitations(
      pendingInvitations.filter((invitation) => invitation.id !== id),
    );

    toast({
      title: "Invitation cancelled",
      description: "The invitation has been cancelled",
    });
  };

  const handleResendInvitation = (id: number) => {
    toast({
      title: "Invitation resent",
      description: "The invitation has been resent",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Invite Team Members
        </h2>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">Email Invitation</TabsTrigger>
          <TabsTrigger value="link">Invitation Link</TabsTrigger>
          <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Email Invitation</CardTitle>
              <CardDescription>
                Invite team members to collaborate on your YouTube channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Admin:</span> Full access to all
                  channels and settings
                  <br />
                  <span className="font-medium">Editor:</span> Can edit videos
                  and view analytics
                  <br />
                  <span className="font-medium">Viewer:</span> Can only view
                  analytics
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personal message (optional)</Label>
                <textarea
                  id="message"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  placeholder="Add a personal message to your invitation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-dashed p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">What happens next?</p>
                    <p className="text-sm text-muted-foreground">
                      An email will be sent to the recipient with a link to join
                      your team. They will need to create an account or log in
                      to accept the invitation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSendInvitation}
                disabled={!email || isSending}
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                {isSending ? "Sending..." : "Send Invitation"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="link" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Invitation Link</CardTitle>
              <CardDescription>
                Create a shareable link that allows people to join your team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="link">Invitation Link</Label>
                <div className="flex">
                  <Input
                    id="link"
                    value="https://tubemetrics.app/invite/team/abc123xyz"
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    className="rounded-l-none gap-2"
                    onClick={handleCopyLink}
                  >
                    {isLinkCopied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-role">Default Role</Label>
                <Select defaultValue="viewer">
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Anyone who joins using this link will be assigned this role by
                  default.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiration">Link Expiration</Label>
                <Select defaultValue="7days">
                  <SelectTrigger id="expiration">
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24hours">24 hours</SelectItem>
                    <SelectItem value="7days">7 days</SelectItem>
                    <SelectItem value="30days">30 days</SelectItem>
                    <SelectItem value="never">Never expires</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border border-dashed p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Security Note</p>
                    <p className="text-sm text-muted-foreground">
                      Anyone with this link can join your team with the selected
                      role. For better security, use email invitations for
                      sensitive accounts or set a short expiration time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleCopyLink}>
                Copy Link
              </Button>
              <Button>Generate New Link</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Manage invitations that have been sent but not yet accepted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvitations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingInvitations.map((invitation) => (
                      <TableRow key={invitation.id}>
                        <TableCell className="font-medium">
                          {invitation.email}
                        </TableCell>
                        <TableCell className="capitalize">
                          {invitation.role}
                        </TableCell>
                        <TableCell>{invitation.sentAt}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleResendInvitation(invitation.id)
                              }
                            >
                              Resend
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleCancelInvitation(invitation.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No pending invitations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
