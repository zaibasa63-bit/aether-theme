import { Link } from "react-router-dom";

export default function SupportPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Support</h1>
      <p>
        For license holders: open a support request through your purchase
        page (ThemeForest item page, or the platform you bought through),
        or contact the author directly with your order/invoice number.
      </p>

      <h2>Before reaching out</h2>
      <ul>
        <li>Check the <Link to="/resources/faq">FAQ</Link> — most "is this a bug?" questions are answered there</li>
        <li>Confirm you're on Node.js 18+ and ran <code>npm install</code> fresh</li>
        <li>Check the browser console for the exact error message</li>
      </ul>

      <h2>What to include in a support request</h2>
      <ul>
        <li>Your browser and OS</li>
        <li>Steps to reproduce the issue</li>
        <li>The exact error message (from the terminal or browser console)</li>
        <li>Your order/invoice number</li>
      </ul>

      <h2>What's covered</h2>
      <p>
        Bug fixes in the theme's own code, and basic guidance using it as
        documented. Custom development (building your own pages, wiring
        your specific backend, design changes beyond what's documented) is
        outside standard support — see <Link to="/resources/integration">Integration</Link> for
        how far the included documentation goes on that front.
      </p>

      <p>
        Have a question about the product itself rather than a bug?{" "}
        <Link to="/contact">Use the contact form</Link>.
      </p>
    </div>
  );
}
