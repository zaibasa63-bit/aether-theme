export interface ImageStyle {
  id: string;
  label: string;
}

export const imageStyles: ImageStyle[] = [
  { id: "photorealistic", label: "Photorealistic" },
  { id: "illustration", label: "Illustration" },
  { id: "3d-render", label: "3D Render" },
  { id: "anime", label: "Anime" },
];

export interface AspectRatio {
  id: string;
  label: string;
  /** width / height, used for the CSS aspect-ratio property */
  ratio: string;
}

export const aspectRatios: AspectRatio[] = [
  { id: "square", label: "1:1", ratio: "1 / 1" },
  { id: "widescreen", label: "16:9", ratio: "16 / 9" },
  { id: "portrait", label: "9:16", ratio: "9 / 16" },
];

export interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  createdAt: string;
  /** Deterministic seed used to render a placeholder gradient tile
   *  instead of a real generated image — see colorsFromSeed() below. */
  seed: string;
}

export const seedGallery: GeneratedImage[] = [
  {
    id: "img_1",
    prompt: "Minimalist logo, violet and cyan gradient, letter A",
    style: "3D Render",
    aspectRatio: "1 / 1",
    createdAt: "2h ago",
    seed: "logo-violet-cyan",
  },
  {
    id: "img_2",
    prompt: "Product shot, wireless keyboard, studio lighting",
    style: "Photorealistic",
    aspectRatio: "16 / 9",
    createdAt: "5h ago",
    seed: "keyboard-studio",
  },
  {
    id: "img_3",
    prompt: "Isometric illustration of a cloud server rack",
    style: "Illustration",
    aspectRatio: "1 / 1",
    createdAt: "1d ago",
    seed: "isometric-server",
  },
  {
    id: "img_4",
    prompt: "Portrait of a robot mascot, friendly, rounded shapes",
    style: "Anime",
    aspectRatio: "9 / 16",
    createdAt: "1d ago",
    seed: "robot-mascot",
  },
  {
    id: "img_5",
    prompt: "Abstract background, flowing gradient mesh",
    style: "3D Render",
    aspectRatio: "16 / 9",
    createdAt: "2d ago",
    seed: "gradient-mesh",
  },
  {
    id: "img_6",
    prompt: "App icon, rounded square, sparkle motif",
    style: "Illustration",
    aspectRatio: "1 / 1",
    createdAt: "3d ago",
    seed: "app-icon-sparkle",
  },
];

/** Deterministically derives two hues from a string so the same seed
 *  always renders the same placeholder gradient (stands in for a real
 *  generated image, without depending on any external image source). */
export function colorsFromSeed(seed: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const hueA = Math.abs(hash) % 360;
  const hueB = (hueA + 70) % 360;
  return [`hsl(${hueA}, 75%, 60%)`, `hsl(${hueB}, 75%, 55%)`];
}
