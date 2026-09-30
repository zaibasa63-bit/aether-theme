import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Seo } from "@/components/Seo";

const contactDetails = [
  { icon: Mail, label: "hello@aethertheme.com" },
  { icon: MessageSquare, label: "Avg. response time: 4 hours" },
  { icon: MapPin, label: "Remote-first team" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  // No backend wired up — this swaps in the success state after a short
  // delay so the interaction reads correctly. Replace with a real POST
  // to your contact endpoint.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="py-20 sm:py-24">
      <Seo
        title="Contact"
        description="Questions about licensing, customization, or whether Aether fits your product — reach out and we'll get back to you."
      />
      <div className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Talk to us
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Questions about licensing, customization, or whether Aether
            fits your product — we read every message ourselves.
          </p>

          <div className="mt-10 space-y-4">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-4 w-4" />
                  </span>
                  {detail.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="mb-4 h-10 w-10 text-success" />
              <h2 className="font-display text-lg font-semibold">
                Message sent
              </h2>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Thanks for reaching out — we'll get back to you within a
                business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ada@company.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Licensing question" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what you're building..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
