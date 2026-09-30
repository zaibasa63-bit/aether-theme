import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import { teamMembers, teamRoles, type TeamMember, type TeamRole } from "@/data/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

let idCounter = 0;

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Member");

  function changeRole(id: string, role: TeamRole) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function handleInvite() {
    const email = inviteEmail.trim();
    if (!email) return;
    idCounter += 1;
    const initials = email.slice(0, 2).toUpperCase();
    setMembers((prev) => [
      ...prev,
      {
        id: `local_${idCounter}`,
        name: email.split("@")[0],
        email,
        role: inviteRole,
        status: "Invited",
        initials,
      },
    ]);
    setInviteEmail("");
    setShowInvite(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-lg font-semibold">Team Management</h1>
          <p className="text-sm text-muted-foreground">
            {members.length} members · {members.filter((m) => m.status === "Invited").length} pending invites
          </p>
        </div>
        <Button onClick={() => setShowInvite((v) => !v)}>
          <UserPlus className="h-4 w-4" />
          Invite member
        </Button>
      </div>

      {showInvite && (
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 pt-6">
            <div className="min-w-[220px] flex-1 space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="teammate@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as TeamRole)}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {teamRoles
                  .filter((r) => r !== "Owner")
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>
            <Button onClick={handleInvite}>Send invite</Button>
            <Button variant="ghost" onClick={() => setShowInvite(false)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="divide-y divide-border">
            {members.map((member) => (
              <div key={member.id} className="flex flex-wrap items-center gap-4 py-4">
                <Avatar>
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-[160px] flex-1">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    member.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent",
                  )}
                >
                  {member.status}
                </span>
                <select
                  value={member.role}
                  disabled={member.role === "Owner"}
                  onChange={(e) => changeRole(member.id, e.target.value as TeamRole)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {teamRoles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeMember(member.id)}
                  disabled={member.role === "Owner"}
                  className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
