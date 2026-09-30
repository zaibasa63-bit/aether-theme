import { useState, type ReactNode } from "react";
import { ChevronDown, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ShowcaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="mb-4 font-display text-sm font-semibold">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

export default function UiComponentsPage() {
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">UI Components</h1>
        <p className="text-sm text-muted-foreground">
          A reference of every primitive used across Aether — copy the pattern, not just the page.
        </p>
      </div>

      <ShowcaseSection title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ShowcaseSection>

      <div className="grid gap-5 lg:grid-cols-2">
        <ShowcaseSection title="Form fields">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="showcase-input">Input</Label>
              <Input id="showcase-input" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="showcase-textarea">Textarea</Label>
              <Textarea id="showcase-textarea" placeholder="Write something..." />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Toggles">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showcase-switch">Switch</Label>
              <Switch id="showcase-switch" checked={switchOn} onCheckedChange={setSwitchOn} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="showcase-checkbox" checked={checked} onCheckedChange={() => setChecked((v) => !v)} />
              <Label htmlFor="showcase-checkbox">Checkbox</Label>
            </div>
          </div>
        </ShowcaseSection>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ShowcaseSection title="Avatars">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-base">PN</AvatarFallback>
            </Avatar>
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">ML</AvatarFallback>
            </Avatar>
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Dropdown menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Options
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User className="h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ShowcaseSection>
      </div>

      <ShowcaseSection title="Tabs">
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">Tab one</TabsTrigger>
            <TabsTrigger value="two">Tab two</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="text-sm text-muted-foreground">
            Content for the first tab.
          </TabsContent>
          <TabsContent value="two" className="text-sm text-muted-foreground">
            Content for the second tab.
          </TabsContent>
        </Tabs>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion">
        <Accordion type="single" collapsible>
          <AccordionItem value="a">
            <AccordionTrigger>Is this accordion accessible?</AccordionTrigger>
            <AccordionContent>
              Yes — it's built on Radix UI's accordion primitive, which handles
              keyboard navigation and ARIA attributes for you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Can I have multiple open at once?</AccordionTrigger>
            <AccordionContent>
              Pass type="multiple" instead of type="single" to the Accordion root.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ShowcaseSection>
    </div>
  );
}
