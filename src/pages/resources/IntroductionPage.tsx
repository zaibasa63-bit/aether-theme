import { Link } from "react-router-dom";

export default function IntroductionPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Aether Documentation</h1>
      <p>
        Aether is a React 19 + TypeScript theme: a full AI SaaS marketing
        site and admin dashboard, built to be re-skinned and shipped fast.
        This section documents how the theme is put together, how to
        customize it, and how to connect it to a real backend.
      </p>

      <h2>What's included</h2>
      <ul>
        <li>
          A full marketing site — Hero, Features, How it Works, Pricing,
          Testimonials, FAQ, Blog (listing + single post), Contact, Login,
          Register
        </li>
        <li>
          A full admin dashboard — 12 pages including AI Chat, Image
          Generation, Prompt Library, Billing, Team, API Keys, Settings,
          Tables, Charts, and a UI component reference
        </li>
        <li>Dark / light / system theme support, persisted across visits</li>
        <li>
          Every interactive element wired up with mock loading states and
          toast feedback — nothing is a dead button, even though there's no
          real backend yet
        </li>
      </ul>

      <h2>Where to go next</h2>
      <ul>
        <li>
          <Link to="/resources/getting-started">Getting Started</Link> — install and run the project locally
        </li>
        <li>
          <Link to="/resources/customization">Customization</Link> — change colors, fonts, and dark mode behavior
        </li>
        <li>
          <Link to="/resources/integration">Integration</Link> — connect a real backend and AI providers (chat, image generation)
        </li>
        <li>
          <Link to="/resources/faq">FAQ</Link> — common questions about the theme's design decisions
        </li>
      </ul>

      <h2>A note on what this theme is (and isn't)</h2>
      <p>
        Aether is a <strong>frontend template</strong>. There is no
        server, no database, and no real authentication included. Every
        interaction you see — chat replies, image generation, team
        invites, billing actions — is a client-side mock, built this way
        deliberately so the theme works immediately without any setup,
        and so you can wire in whichever backend or AI provider you
        actually use. The <Link to="/resources/integration">Integration</Link> page
        covers exactly how to do that.
      </p>
    </div>
  );
}
