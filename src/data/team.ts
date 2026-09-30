export const teamRoles = ["Owner", "Admin", "Member", "Viewer"] as const;
export type TeamRole = (typeof teamRoles)[number];

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: "Active" | "Invited";
  initials: string;
}

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "Ada Lovelace", email: "ada@company.com", role: "Owner", status: "Active", initials: "AL" },
  { id: "u2", name: "Priya Nair", email: "priya@company.com", role: "Admin", status: "Active", initials: "PN" },
  { id: "u3", name: "Marcus Lee", email: "marcus@company.com", role: "Member", status: "Active", initials: "ML" },
  { id: "u4", name: "Sofia Ramirez", email: "sofia@company.com", role: "Member", status: "Active", initials: "SR" },
  { id: "u5", name: "Daniel Osei", email: "daniel@company.com", role: "Viewer", status: "Invited", initials: "DO" },
];
