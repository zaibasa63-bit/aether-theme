export default function IntegrationPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Integration</h1>
      <p>
        This is a frontend-only theme — no server, no database, no real
        authentication. Every interactive flow is a mock, marked in the
        code with the comment <code>// No backend wired up</code>. This
        page walks through connecting a real one, using AI Chat and Image
        Generation as the two most common integrations.
      </p>

      <h2>The one rule: never call an AI provider directly from the browser</h2>
      <p>
        OpenAI, Stability AI, Replicate, and every other provider expect a
        secret API key on every request. If that key is anywhere in your
        frontend code or bundle, anyone can open devtools, copy it, and
        run up your bill. <strong>The API key must live on a server you
        control</strong>, and your frontend calls your server, which
        calls the provider.
      </p>
      <pre>
        <code>{`Browser (Aether)  →  Your backend (holds the API key)  →  AI provider
     ↑                                                          |
     └──────────────────── response ───────────────────────────┘`}</code>
      </pre>
      <p>
        Two ways to build "your backend": a small standalone server
        (Express, Fastify, etc. — works anywhere: a VPS, Railway, Render,
        Fly.io), or a serverless function (a single file under{" "}
        <code>/api</code>, deployed on Vercel, Netlify, or similar). The
        example below uses a minimal Express server since it's the most
        portable; the request/response shape is identical either way.
      </p>

      <h2>Example: wiring real image generation (OpenAI)</h2>
      <p>
        <strong>1. Create a tiny backend</strong> (e.g. a{" "}
        <code>server/</code> folder next to <code>src/</code>):
      </p>
      <pre>
        <code>{`// server/index.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/generate-image", async (req, res) => {
  const { prompt, size = "1024x1024" } = req.body;
  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size,
    });
    res.json({ url: result.data[0].url });
  } catch (err) {
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3001, () => console.log("API running on :3001"));`}</code>
      </pre>
      <p>
        Put your real key in a <code>.env</code> file on the server (never
        committed): <code>OPENAI_API_KEY=sk-...</code>
      </p>

      <p>
        <strong>2. Replace the mock in the frontend.</strong> In{" "}
        <code>src/pages/dashboard/ImageGenerationPage.tsx</code>, find{" "}
        <code>handleGenerate</code> — it currently does a{" "}
        <code>setTimeout</code> and a placeholder gradient. Replace the
        body with a real request:
      </p>
      <pre>
        <code>{`async function handleGenerate() {
  const text = prompt.trim();
  if (!text) return;

  setIsGenerating(true);
  try {
    const res = await fetch("http://localhost:3001/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });
    const { url } = await res.json();

    setGallery((prev) => [
      { id: crypto.randomUUID(), prompt: text, url, style, aspectRatio: ratio.ratio, createdAt: "Just now" },
      ...prev,
    ]);
    setPrompt("");
  } catch {
    toast.error("Image generation failed — try again");
  } finally {
    setIsGenerating(false);
  }
}`}</code>
      </pre>
      <p>
        You'll also want to swap the <code>GeneratedImage</code> type's{" "}
        <code>seed</code> field for a real <code>url</code>, and render{" "}
        <code>&lt;img src={"{image.url}"} /&gt;</code> in{" "}
        <code>ImageTile</code> instead of the CSS gradient.
      </p>

      <h2>Example: wiring real AI Chat</h2>
      <p>
        Same pattern in <code>src/pages/dashboard/ChatPage.tsx</code> —{" "}
        <code>handleSend</code> currently picks a random canned reply
        after a delay. Replace it with a request to your backend, which in
        turn calls your model provider (OpenAI's Chat Completions API,
        Anthropic's Messages API, etc.). For a real product, you'll likely
        want to stream the response token-by-token rather than wait for
        the full reply — most providers support Server-Sent Events or a
        streaming response body for this.
      </p>

      <h2>Other providers</h2>
      <ul>
        <li>
          <strong>Stability AI</strong> — REST API, similar shape to the
          OpenAI example above; see their{" "}
          <a href="https://platform.stability.ai/docs/api-reference" target="_blank" rel="noreferrer">
            API reference
          </a>
        </li>
        <li>
          <strong>Replicate</strong> — works well from a serverless
          function since predictions are polled or webhook-driven rather
          than a single request/response; see their{" "}
          <a href="https://replicate.com/docs" target="_blank" rel="noreferrer">
            docs
          </a>
        </li>
      </ul>

      <h2>Real authentication</h2>
      <p>
        <code>LoginPage.tsx</code> and <code>RegisterPage.tsx</code> show
        a loading state and redirect to <code>/dashboard</code> with no
        real check. Replace the <code>setTimeout</code> in each with a
        call to your auth provider (your own backend + a sessions/JWT
        setup, or a service like Clerk, Auth0, or Supabase Auth), and gate{" "}
        <code>/dashboard/*</code> routes in <code>App.tsx</code> behind an
        authenticated check.
      </p>
    </div>
  );
}
