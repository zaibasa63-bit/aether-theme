import { useState } from "react";
import { toast } from "sonner";

interface MockActionOptions {
  /** Message shown in the success toast once the delay completes */
  successMessage: string;
  /** How long to show the loading state, in ms. Defaults to 900. */
  delay?: number;
}

/**
 * Standardizes every "no real backend" button in the theme: flips a
 * loading flag, waits a short delay to simulate a request, then shows a
 * success toast. Pass onDone for anything that should happen after
 * (closing a dialog, resetting a form, navigating away).
 */
export function useMockAction({ successMessage, delay = 900 }: MockActionOptions) {
  const [loading, setLoading] = useState(false);

  function run(onDone?: () => void) {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(successMessage);
      onDone?.();
    }, delay);
  }

  return { loading, run };
}
