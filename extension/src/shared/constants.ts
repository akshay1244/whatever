export const APP_NAME = 'Adios';
export const APP_VERSION = '1.0.0';
export const APP_TAGLINE = 'Kick AI the f*ck off your feed.';

export const COLORS = {
  accent: '#ff5b3a',
  accentHover: '#ff7a5e',
  bgDark: '#0b0b0d',
  bgSurface: '#141418',
  bgCard: '#1a1a20',
  border: '#2a2a32',
  textPrimary: '#f0f0f2',
  textSecondary: '#8a8a96',
  textMuted: '#5a5a66',
} as const;

export const PLATFORM_IDS = [
  'youtube',
  'instagram',
  'tiktok',
  'twitter',
  'reddit',
  'facebook',
  'linkedin',
  'pinterest',
  'twitch',
] as const;

export const PLATFORM_NAMES: Record<PlatformId, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'X (Twitter)',
  reddit: 'Reddit',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  twitch: 'Twitch',
};

export const PLATFORM_HOSTNAMES: Record<PlatformId, string[]> = {
  youtube: ['www.youtube.com', 'youtube.com', 'm.youtube.com'],
  instagram: ['www.instagram.com', 'instagram.com'],
  tiktok: ['www.tiktok.com', 'tiktok.com'],
  twitter: ['twitter.com', 'x.com', 'www.x.com'],
  reddit: ['www.reddit.com', 'reddit.com', 'old.reddit.com'],
  facebook: ['www.facebook.com', 'facebook.com'],
  linkedin: ['www.linkedin.com', 'linkedin.com'],
  pinterest: ['www.pinterest.com', 'pinterest.com'],
  twitch: ['www.twitch.tv', 'twitch.tv'],
};

export type PlatformId = typeof PLATFORM_IDS[number];

export const STORAGE_KEYS = {
  settings: 'adios_settings',
  statistics: 'adios_statistics',
  channelLists: 'adios_channel_lists',
  settingsVersion: 'adios_settings_version',
} as const;

export const CURRENT_SETTINGS_VERSION = 1;

export const PERFORMANCE = {
  observerDebounceMs: 50,
  detectionCacheTtlMs: 5 * 60 * 1000,
  detectionCacheMaxSize: 500,
  statsThrottleMs: 1000,
} as const;

export const URLS = {
  website: 'https://adios.dev',
  welcomePage: 'https://adios.dev?installed=true',
  chromeStore: 'https://chrome.google.com/webstore/detail/adios',
  firefoxAddons: 'https://addons.mozilla.org/en-US/firefox/addon/adios',
} as const;
