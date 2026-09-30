import { lazy, Suspense, type ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DocsLayout } from "@/components/layout/DocsLayout";

// Every route below the home page is code-split with React.lazy, so the
// initial bundle only pays for the landing page. Each dashboard/marketing
// page becomes its own chunk, fetched the first time its route is visited.
const BlogListPage = lazy(() => import("@/pages/BlogListPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const DashboardHomePage = lazy(() => import("@/pages/dashboard/DashboardHomePage"));
const ChatPage = lazy(() => import("@/pages/dashboard/ChatPage"));
const ImageGenerationPage = lazy(() => import("@/pages/dashboard/ImageGenerationPage"));
const PromptLibraryPage = lazy(() => import("@/pages/dashboard/PromptLibraryPage"));
const BillingPage = lazy(() => import("@/pages/dashboard/BillingPage"));
const TeamPage = lazy(() => import("@/pages/dashboard/TeamPage"));
const ApiKeysPage = lazy(() => import("@/pages/dashboard/ApiKeysPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const TablesPage = lazy(() => import("@/pages/dashboard/TablesPage"));
const ChartsPage = lazy(() => import("@/pages/dashboard/ChartsPage"));
const UiComponentsPage = lazy(() => import("@/pages/dashboard/UiComponentsPage"));
const BlankPage = lazy(() => import("@/pages/dashboard/BlankPage"));

const IntroductionPage = lazy(() => import("@/pages/resources/IntroductionPage"));
const GettingStartedPage = lazy(() => import("@/pages/resources/GettingStartedPage"));
const FolderStructurePage = lazy(() => import("@/pages/resources/FolderStructurePage"));
const CustomizationDocsPage = lazy(() => import("@/pages/resources/CustomizationPage"));
const IntegrationPage = lazy(() => import("@/pages/resources/IntegrationPage"));
const DeploymentPage = lazy(() => import("@/pages/resources/DeploymentPage"));
const AddingPagesPage = lazy(() => import("@/pages/resources/AddingPagesPage"));
const DocsFaqPage = lazy(() => import("@/pages/resources/FaqPage"));
const DocsChangelogPage = lazy(() => import("@/pages/resources/ChangelogPage"));
const LicensePage = lazy(() => import("@/pages/resources/LicensePage"));
const DocsSupportPage = lazy(() => import("@/pages/resources/SupportPage"));

/** Shown briefly while a lazy route's chunk is fetched. */
function RouteLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

/**
 * CHECKPOINT 13 — batch fix pass: every "silent" button (Settings save/
 * password/photo/delete, Billing upgrade/cancel/payment, Login/Register
 * submit) now has real mock feedback via the useMockAction hook + sonner
 * toasts (see Toaster below). Nothing here talks to a real backend —
 * every action is a timed mock, by design, for a template buyer to
 * replace.
 */
function LandingPage() {
  return (
    <main>
      <Seo
        title="AI SaaS Landing Page + Dashboard Theme"
        description="Aether gives you the chat, generation, and analytics surfaces most AI products need — pre-built, fully typed, and ready to connect to your own models."
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
    </main>
  );
}

/** Wraps every marketing page (Home, Blog, Contact) in the shared Navbar/Footer. */
function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const { resolvedTheme } = useTheme();

  return (
    <Suspense fallback={<RouteLoader />}>
      <Toaster theme={resolvedTheme} position="bottom-right" richColors closeButton />
      <Routes>
        {/* Marketing site */}
        <Route path="/" element={<MarketingLayout><LandingPage /></MarketingLayout>} />
        <Route path="/blog" element={<MarketingLayout><BlogListPage /></MarketingLayout>} />
        <Route path="/blog/:slug" element={<MarketingLayout><BlogPostPage /></MarketingLayout>} />
        <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="image-generation" element={<ImageGenerationPage />} />
          <Route path="prompts" element={<PromptLibraryPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="tables" element={<TablesPage />} />
          <Route path="charts" element={<ChartsPage />} />
          <Route path="components" element={<UiComponentsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="blank" element={<BlankPage />} />
        </Route>

        {/* Resources / Documentation */}
        <Route path="/resources" element={<DocsLayout />}>
          <Route index element={<IntroductionPage />} />
          <Route path="getting-started" element={<GettingStartedPage />} />
          <Route path="folder-structure" element={<FolderStructurePage />} />
          <Route path="customization" element={<CustomizationDocsPage />} />
          <Route path="integration" element={<IntegrationPage />} />
          <Route path="deployment" element={<DeploymentPage />} />
          <Route path="adding-pages" element={<AddingPagesPage />} />
          <Route path="faq" element={<DocsFaqPage />} />
          <Route path="changelog" element={<DocsChangelogPage />} />
          <Route path="license" element={<LicensePage />} />
          <Route path="support" element={<DocsSupportPage />} />
        </Route>

        {/* 404 — standalone, no marketing or dashboard chrome */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
