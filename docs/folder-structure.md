# Folder structure

```
aether/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn-style primitives — Button, Card, Input,
│   │   │                        Textarea, Label, Switch, Checkbox, Avatar, Badge,
│   │   │                        Tabs, Accordion, DropdownMenu, Sheet
│   │   ├── landing/            # Hero, Features, HowItWorks, Pricing, Testimonials,
│   │   │                        FAQ, Navbar, Footer, AIGenerationDemo
│   │   ├── layout/              # DashboardLayout, Sidebar, Topbar, Breadcrumbs
│   │   ├── dashboard/           # StatCard, UsageChart, CreditBalanceCard,
│   │   │                        RecentGenerationsList
│   │   └── theme/               # ThemeToggle
│   ├── context/
│   │   └── ThemeContext.tsx     # light/dark/system + localStorage
│   ├── data/                    # one typed mock-data file per feature
│   │   ├── heroDemo.ts, features.ts, process.ts, pricing.ts,
│   │   │   testimonials.ts, faqs.ts, blog.ts
│   │   ├── dashboardNav.ts      # sidebar structure — also drives breadcrumbs
│   │   ├── dashboardStats.ts, chatHistory.ts, imageStudio.ts,
│   │   │   promptLibrary.ts, billing.ts, team.ts, apiKeys.ts,
│   │   │   tableData.ts, chartShowcase.ts
│   ├── lib/
│   │   ├── utils.ts             # cn() — Tailwind class merge
│   │   ├── useTypewriter.ts     # hero demo's typing animation
│   │   ├── useMockAction.ts     # shared loading+toast pattern for mock buttons
│   │   └── nav.ts               # resolves a dashboard route to its nav label
│   ├── pages/
│   │   ├── BlogListPage.tsx, BlogPostPage.tsx, ContactPage.tsx,
│   │   │   LoginPage.tsx, RegisterPage.tsx, NotFoundPage.tsx
│   │   └── dashboard/
│   │       ├── DashboardHomePage.tsx, ChatPage.tsx,
│   │       │   ImageGenerationPage.tsx, PromptLibraryPage.tsx,
│   │       │   BillingPage.tsx, TeamPage.tsx, ApiKeysPage.tsx,
│   │       │   SettingsPage.tsx, TablesPage.tsx, ChartsPage.tsx,
│   │       │   UiComponentsPage.tsx, BlankPage.tsx, ComingSoonPage.tsx
│   ├── types/
│   │   └── nav.ts               # NavItem / NavGroup / NavLeaf types
│   ├── App.tsx                  # all routing, lazy-loaded per page
│   ├── main.tsx                 # entry point — ThemeProvider + BrowserRouter
│   └── index.css                # design tokens (see customization.md)
├── eslint.config.js
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

**One file per subject, one subject per file.** Mock data lives in
`src/data/`, never inline in a page component — this is the main thing
to know when customizing content.
