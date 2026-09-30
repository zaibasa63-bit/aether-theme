import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

/**
 * Simple two-state toggle (light <-> dark) for the navbar.
 * For a three-way Light / Dark / System control, see ThemeMenu
 * (used in Settings > Appearance).
 */
export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun
        className={`h-5 w-5 transition-all ${
          resolvedTheme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all ${
          resolvedTheme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
        }`}
      />
    </Button>
  );
}
