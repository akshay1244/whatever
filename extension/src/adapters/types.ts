import type { ContentItem, FeedRegion, ObserverTarget } from '../shared/types';

export interface PlatformAdapter {
  readonly platformId: string;
  readonly hostname: string[];
  initialize(): void;
  getCurrentRegion(): FeedRegion;
  extractContentItems(node: Element): ContentItem[];
  getObserverTargets(): ObserverTarget[];
  getNavigationEvent(): string | null;
  destroy(): void;
}
