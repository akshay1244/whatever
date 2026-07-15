import { debounce } from '../shared/utils/debounce';
import type { PlatformAdapter } from '../adapters/types';
import type { ContentItem } from '../shared/types';
import { PERFORMANCE } from '../shared/constants';

export class ObserverEngine {
  private adapter: PlatformAdapter;
  private observer: MutationObserver | null = null;
  private processedNodes = new WeakSet<Element>();
  private activeTargets = new Set<string>();

  private processMutations = debounce((mutations: MutationRecord[]) => {
    const newItems: ContentItem[] = [];
    const targets = this.adapter.getObserverTargets();

    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (!(node instanceof Element)) continue;

        for (const target of targets) {
          if (node.matches(target.itemSelector)) {
            if (!this.processedNodes.has(node)) {
              this.processedNodes.add(node);
              const items = this.adapter.extractContentItems(node);
              newItems.push(...items);
            }
          }

          if (target.subtree) {
            const children = node.querySelectorAll(target.itemSelector);
            for (const child of Array.from(children)) {
              if (!this.processedNodes.has(child)) {
                this.processedNodes.add(child);
                const items = this.adapter.extractContentItems(child);
                newItems.push(...items);
              }
            }
          }
        }
      }
    }

    if (newItems.length > 0) {
      this.handleNewItems(newItems);
    }
  }, PERFORMANCE.observerDebounceMs);

  constructor(adapter: PlatformAdapter) {
    this.adapter = adapter;
  }

  public start(): void {
    if (this.observer) return;

    this.observer = new MutationObserver((mutations) => {
      this.processMutations(mutations);
    });

    const targets = this.adapter.getObserverTargets();
    for (const target of targets) {
      const containers = document.querySelectorAll(target.containerSelector);
      for (const container of Array.from(containers)) {
        this.activeTargets.add(target.containerSelector);
        this.observer.observe(container, {
          childList: true,
          subtree: target.subtree,
        });
      }
    }

    if (this.activeTargets.size === 0) {
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  public stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.processMutations.cancel();
    this.activeTargets.clear();
  }

  private handleNewItems(items: ContentItem[]): void {
    console.log(items);
  }
}
