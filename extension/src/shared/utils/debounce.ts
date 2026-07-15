export interface DebouncedFunction<T extends (...args: any[]) => void> {
  (...args: Parameters<T>): void;
  cancel(): void;
  flush(): void;
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>) => {
    latestArgs = args;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      const argsToUse = latestArgs;
      latestArgs = null;
      if (argsToUse) {
        fn(...argsToUse);
      }
    }, delayMs);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    latestArgs = null;
  };

  debounced.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (latestArgs) {
      const argsToUse = latestArgs;
      latestArgs = null;
      fn(...argsToUse);
    }
  };

  return debounced as DebouncedFunction<T>;
}
