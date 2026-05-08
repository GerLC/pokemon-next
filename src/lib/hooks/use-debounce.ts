import { useEffect, useMemo, useRef } from "react";
import { debounce } from "../utils";

/**
 * Custom hook to debounce a callback.
 * Uses useRef to always point to the latest callback logic.
 * Uses useMemo to keep debounced function stable.
 * Uses useEffect ONLY for cleanup on unmount.
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
) {
  const fnRef = useRef(fn);

  fnRef.current = fn;

  const debounced = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        return fnRef.current(...args);
      }, delay),
    [delay],
  );

  useEffect(() => {
    return () => debounced.cancel();
  }, [debounced]);

  return debounced;
}
