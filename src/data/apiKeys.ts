export const apiScopes = ["chat", "image-gen", "code", "analytics"] as const;
export type ApiScope = (typeof apiScopes)[number];

export interface ApiKey {
  id: string;
  name: string;
  /** Masked preview — the full key is only ever shown once, at creation */
  preview: string;
  created: string;
  lastUsed: string;
  scopes: ApiScope[];
}

export const apiKeys: ApiKey[] = [
  {
    id: "key_1",
    name: "Production backend",
    preview: "sk_live_••••••••••••4f2a",
    created: "Jun 3, 2026",
    lastUsed: "2h ago",
    scopes: ["chat", "image-gen", "code"],
  },
  {
    id: "key_2",
    name: "Staging",
    preview: "sk_test_••••••••••••9b1c",
    created: "Jul 18, 2026",
    lastUsed: "3d ago",
    scopes: ["chat", "code"],
  },
  {
    id: "key_3",
    name: "Analytics export script",
    preview: "sk_live_••••••••••••7e08",
    created: "Aug 30, 2026",
    lastUsed: "Never",
    scopes: ["analytics"],
  },
];

/** Generates a fake, realistic-looking key for the one-time reveal panel. */
export function generateFakeKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let body = "";
  for (let i = 0; i < 32; i++) {
    body += chars[Math.floor(Math.random() * chars.length)];
  }
  return `sk_live_${body}`;
}
