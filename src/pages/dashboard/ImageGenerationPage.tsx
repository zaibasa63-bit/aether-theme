import { useState } from "react";
import { Download, Heart, ImageIcon, Sparkles, Wand2 } from "lucide-react";
import {
  aspectRatios,
  colorsFromSeed,
  imageStyles,
  seedGallery,
  type GeneratedImage,
} from "@/data/imageStudio";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

let idCounter = 0;

function ImageTile({ image, isGenerating }: { image: GeneratedImage; isGenerating?: boolean }) {
  const [colorA, colorB] = colorsFromSeed(image.seed);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card">
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isGenerating && "animate-pulse",
        )}
        style={{
          aspectRatio: image.aspectRatio,
          background: isGenerating
            ? undefined
            : `linear-gradient(135deg, ${colorA}, ${colorB})`,
        }}
      >
        {isGenerating ? (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Sparkles className="h-6 w-6 animate-pulse text-muted-foreground" />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex gap-2">
              <button className="rounded-md bg-white/90 p-1.5 text-neutral-900 hover:bg-white">
                <Download className="h-3.5 w-3.5" />
              </button>
              <button className="rounded-md bg-white/90 p-1.5 text-neutral-900 hover:bg-white">
                <Heart className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="truncate text-xs font-medium">{image.prompt}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {image.style} · {image.createdAt}
        </p>
      </div>
    </div>
  );
}

export default function ImageGenerationPage() {
  const [gallery, setGallery] = useState<GeneratedImage[]>(seedGallery);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(imageStyles[0].id);
  const [ratio, setRatio] = useState(aspectRatios[0]);
  const [generatingIds, setGeneratingIds] = useState<string[]>([]);

  function handleGenerate() {
    const text = prompt.trim();
    if (!text) return;

    idCounter += 1;
    const id = `local_${idCounter}`;
    const styleLabel = imageStyles.find((s) => s.id === style)?.label ?? style;

    const placeholder: GeneratedImage = {
      id,
      prompt: text,
      style: styleLabel,
      aspectRatio: ratio.ratio,
      createdAt: "Just now",
      seed: `${text}-${id}`,
    };

    setGallery((prev) => [placeholder, ...prev]);
    setGeneratingIds((prev) => [...prev, id]);
    setPrompt("");

    // No model wired up — swaps the tile from a "generating" shimmer to
    // its placeholder gradient after a short delay. Replace with a real
    // request to your image generation endpoint.
    setTimeout(() => {
      setGeneratingIds((prev) => prev.filter((g) => g !== id));
    }, 1600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Prompt panel */}
      <div className="h-fit space-y-5 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <ImageIcon className="h-4 w-4" />
          </span>
          <h1 className="font-display text-sm font-semibold">Image Generation</h1>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A minimalist logo, violet and cyan gradient..."
            className="min-h-[90px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {imageStyles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={cn(
                  "rounded-md border border-border px-3 py-2 text-xs font-medium transition-colors",
                  style === s.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Aspect ratio</Label>
          <div className="flex gap-2">
            {aspectRatios.map((r) => (
              <button
                key={r.id}
                onClick={() => setRatio(r)}
                className={cn(
                  "flex-1 rounded-md border border-border px-3 py-2 text-xs font-medium transition-colors",
                  ratio.id === r.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt.trim()}>
          <Wand2 className="h-4 w-4" />
          Generate
        </Button>
        <p className="text-center text-[11px] text-muted-foreground">4 credits per image</p>
      </div>

      {/* Gallery */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold">Your generations</h2>
          <span className="text-xs text-muted-foreground">{gallery.length} images</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((image) => (
            <ImageTile
              key={image.id}
              image={image}
              isGenerating={generatingIds.includes(image.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
