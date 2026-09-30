export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  /** Yearly price is shown as an effective monthly rate */
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "For trying Aether out on a side project.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "1,000 AI generations / month",
      "1 team member",
      "Community support",
      "Aether branding on outputs",
    ],
    cta: "Start for free",
  },
  {
    name: "Pro",
    description: "For teams shipping an AI feature to real users.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "50,000 AI generations / month",
      "5 team members",
      "Priority support",
      "Remove Aether branding",
      "Usage analytics & alerts",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For platforms with custom volume or compliance needs.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Unlimited generations",
      "Unlimited team members",
      "Dedicated support & SLA",
      "SSO & audit logs",
      "Custom model routing",
    ],
    cta: "Contact sales",
  },
];
