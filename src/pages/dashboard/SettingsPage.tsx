import { useRef, useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useMockAction } from "@/lib/useMockAction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveProfile = useMockAction({ successMessage: "Profile updated successfully" });
  const updatePassword = useMockAction({ successMessage: "Password updated successfully" });
  const deleteAccount = useMockAction({ successMessage: "Account scheduled for deletion" });

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      toast.success("Profile photo updated");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and account preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">AL</AvatarFallback>
                </Avatar>
                <div>
                  {/* Hidden file input — the button just proxies a click to it.
                      No upload actually happens; this is a mock for the theme demo. */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Change photo
                  </Button>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    JPG or PNG, up to 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full name</Label>
                  <Input id="full-name" defaultValue="Ada Lovelace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ada@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Building AI-powered products at Aether."
                  className="min-h-[90px]"
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={() => saveProfile.run()} disabled={saveProfile.loading}>
                  {saveProfile.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saveProfile.loading ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => updatePassword.run()} disabled={updatePassword.loading}>
                    {updatePassword.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {updatePassword.loading ? "Updating..." : "Update password"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <p className="text-sm font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Require a code from your authenticator app when logging in.
                  </p>
                </div>
                <Switch
                  checked={twoFactor}
                  onCheckedChange={(checked) => {
                    setTwoFactor(checked);
                    toast.success(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
                  }}
                />
              </CardContent>
            </Card>

            <Card className="border-destructive/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Danger zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deleting your account removes all workspaces, generations,
                  and billing history. This can't be undone.
                </p>
                {confirmingDelete ? (
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="default"
                      className="bg-destructive hover:bg-destructive/90"
                      disabled={deleteAccount.loading}
                      onClick={() => deleteAccount.run(() => setConfirmingDelete(false))}
                    >
                      {deleteAccount.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                      {deleteAccount.loading ? "Processing..." : "Confirm delete"}
                    </Button>
                    <Button variant="ghost" onClick={() => setConfirmingDelete(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-4 border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setConfirmingDelete(true)}
                  >
                    Delete account
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
