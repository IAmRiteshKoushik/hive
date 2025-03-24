import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, X, Check, Shield, Edit, Trash, Eye } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useToast } from "../../../hooks/use-toast";

export const Route = createFileRoute("/dashboard/team/")({
  component: RouteComponent,
});

// Mock team members data
const initialTeamMembers = [
  {
    id: 1,
    name: "You",
    email: "you@example.com",
    role: "Admin",
    status: "Active",
    dateAdded: "2023-01-15",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "Editor",
    status: "Active",
    dateAdded: "2023-03-22",
  },
  {
    id: 3,
    name: "Mary Taylor",
    email: "mary@example.com",
    role: "Viewer",
    status: "Active",
    dateAdded: "2023-05-10",
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Viewer",
    status: "Pending",
    dateAdded: "2023-06-05",
  },
];

function RouteComponent() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Viewer");
  const [editMemberId, setEditMemberId] = useState<number | null>(null);
  const [editMemberRole, setEditMemberRole] = useState("");
  const { toast } = useToast();

  const handleInviteMember = () => {
    if (!newMemberEmail) return;

    // In a real app, you would send an invitation email here
    const newMember = {
      id: teamMembers.length + 1,
      name: newMemberEmail.split("@")[0],
      email: newMemberEmail,
      role: newMemberRole,
      status: "Pending",
      dateAdded: "2023-06-15", // Use a fixed date for demo purposes
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("Viewer");
    setIsInviteDialogOpen(false);

    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newMemberEmail}`,
    });
  };

  const handleEditRole = (id: number) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id ? { ...member, role: editMemberRole } : member,
      ),
    );

    setEditMemberId(null);
    setEditMemberRole("");

    toast({
      title: "Role updated",
      description: "Team member role has been updated successfully",
    });
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));

    toast({
      title: "Member removed",
      description: "Team member has been removed successfully",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to collaborate on your YouTube channels.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
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
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsInviteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleInviteMember}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their access to your YouTube channels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {editMemberId === member.id ? (
                      <Select
                        value={editMemberRole || member.role}
                        onValueChange={setEditMemberRole}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-1">
                        {member.role === "Admin" && (
                          <Shield className="h-4 w-4 text-primary" />
                        )}
                        {member.role}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          member.status === "Active"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      {member.status}
                    </div>
                  </TableCell>
                  <TableCell>{member.dateAdded}</TableCell>
                  <TableCell className="text-right">
                    {editMemberId === member.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditRole(member.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditMemberId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        {member.id !== 1 && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditMemberId(member.id);
                                setEditMemberRole(member.role);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding the different permission levels for team members.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Admin</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Full access to all channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Manage team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Connect/disconnect channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Edit videos and settings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>View all analytics</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Edit className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Editor</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Access to assigned channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Cannot manage team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Cannot connect/disconnect channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Edit videos and settings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>View all analytics</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Viewer</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Access to assigned channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Cannot manage team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Cannot connect/disconnect channels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span>Cannot edit videos or settings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>View all analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
