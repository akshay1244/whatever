export interface ThrottledFunction<T extends (...args: any[]) => void> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  intervalMs: number,
): ThrottledFunction<T> {
  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - lastCallTime;

    latestArgs = args;

    if (elapsed >= intervalMs) {
      lastCallTime = now;
      latestArgs = null;
      fn(...args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        const argsToUse = latestArgs;
        latestArgs = null;
        if (argsToUse) {
          fn(...argsToUse);
        }
      }, intervalMs - elapsed);
    }
  };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    latestArgs = null;
  };

  return throttled as ThrottledFunction<T>;
}
