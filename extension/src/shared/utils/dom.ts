export function safeQuerySelector<T extends Element = Element>(
  selector: string,
  scope: Element | Document = document,
): T | null {
  try {
    return scope.querySelector<T>(selector);
  } catch {
    return null;
  }
}

export function safeQuerySelectorAll<T extends Element = Element>(
  selector: string,
  scope: Element | Document = document,
): T[] {
  try {
    return Array.from(scope.querySelectorAll<T>(selector));
  } catch {
    return [];
  }
}

export function getTextContent(element: Element | null): string {
  if (!element) return '';
  return (element.textContent ?? '').trim();
}

export function getAttribute(
  element: Element | null,
  attr: string,
): string | null {
  if (!element) return null;
  return element.getAttribute(attr);
}

export function isConnected(element: Element | null): boolean {
  return element?.isConnected ?? false;
}

export function waitForElement<T extends Element = Element>(
  selector: string,
  timeoutMs = 10000,
  scope: Element | Document = document,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const existing = safeQuerySelector<T>(selector, scope);
    if (existing) {
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = safeQuerySelector<T>(selector, scope);
      if (el) {
        observer.disconnect();
        clearTimeout(timer);
        resolve(el);
      }
    });

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`waitForElement("${selector}") timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    observer.observe(scope instanceof Document ? scope.body : scope, {
      childList: true,
      subtree: true,
    });
  });
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options?: {
    className?: string;
    id?: string;
    attrs?: Record<string, string>;
    textContent?: string;
    innerHTML?: string;
  },
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  if (options?.className) el.className = options.className;
  if (options?.id) el.id = options.id;
  if (options?.textContent) el.textContent = options.textContent;
  if (options?.innerHTML) el.innerHTML = options.innerHTML;

  if (options?.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      el.setAttribute(key, value);
    }
  }

  return el;
}
