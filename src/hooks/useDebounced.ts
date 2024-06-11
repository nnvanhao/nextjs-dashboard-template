import { useCallback, useRef } from "react";

export function useDebounced(callback: () => void, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(callback, delay);
  }, [callback, delay]);

  return debouncedCallback;
}
