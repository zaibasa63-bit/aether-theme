import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  /** Milliseconds between each character while typing */
  typingSpeed?: number;
  /** Milliseconds to pause once the full string is typed, before onComplete fires */
  holdDuration?: number;
  /** Delay before typing starts */
  startDelay?: number;
}

/**
 * Types out `text` one character at a time. Returns the current substring
 * plus a `done` flag, so callers can chain a follow-up animation
 * (e.g. reveal a result card once the prompt has finished "typing").
 */
export function useTypewriter(
  text: string,
  { typingSpeed = 35, holdDuration = 800, startDelay = 0 }: UseTypewriterOptions = {},
) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOutput("");
    setDone(false);

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setOutput(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setTimeout(() => setDone(true), holdDuration);
        }
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, typingSpeed, holdDuration, startDelay]);

  return { output, done };
}
