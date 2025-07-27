import { useCallback, useRef } from "react";

export const useDebounce = <T>(
  callback: (inputValue: string) => Promise<T>,
  delay: number,
) => {
  const timer = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (inputValue: string): Promise<T> => {
      return new Promise((resolve) => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
        timer.current = setTimeout(async () => {
          const result = await callback(inputValue);
          resolve(result);
        }, delay);
      });
    },
    [callback, delay],
  );

  return debouncedFunction;
};
