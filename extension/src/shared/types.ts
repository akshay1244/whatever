import type { PlatformId } from './constants';

export type FeedRegion =
  | 'home'
  | 'shorts'
  | 'watch'
  | 'search'
  | 'channel'
  | 'explore'
  | 'subscriptions'
  | 'trending'
  | 'unknown';

export type ContentType = 'video' | 'short' | 'reel' | 'post' | 'story';

export interface ContentItem {
  id: string;
  platform: PlatformId;
  type: ContentType;
  region: FeedRegion;
  element: Element;
  title: string;
  channelName: string;
  channelUrl: string;
  contentUrl: string;
  thumbnailUrl: string | null;
  viewCount: number | null;
  uploadDate: string | null;
  durationSeconds: number | null;
  description: string | null;
  rawMetadata: Record<string, unknown>;
}

export interface TabState {
  isActive: boolean;
  platform: PlatformId | null;
  region: FeedRegion;
  videosHidden: number;
  shortsHidden: number;
  totalScanned: number;
  lastUpdated: number;
}

export interface ObserverTarget {
  containerSelector: string;
  itemSelector: string;
  subtree: boolean;
  region: FeedRegion;
}
