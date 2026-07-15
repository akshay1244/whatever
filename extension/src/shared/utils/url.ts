export function getHostname(url?: string): string {
  try {
    const target = url ?? window.location.href;
    return new URL(target).hostname;
  } catch {
    return '';
  }
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const videoId = parsed.searchParams.get('v');
      if (videoId) return videoId;

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch) return shortsMatch[1];

      const embedMatch = parsed.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];

      const liveMatch = parsed.pathname.match(/^\/live\/([a-zA-Z0-9_-]{11})/);
      if (liveMatch) return liveMatch[1];
    }

    if (hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      if (id.length === 11) return id;
    }

    return null;
  } catch {
    return null;
  }
}

export function extractYouTubeChannelId(url: string): string | null {
  try {
    const parsed = new URL(url);

    const handleMatch = parsed.pathname.match(/^\/@([a-zA-Z0-9_.-]+)/);
    if (handleMatch) return `@${handleMatch[1]}`;

    const channelMatch = parsed.pathname.match(/^\/channel\/(UC[a-zA-Z0-9_-]+)/);
    if (channelMatch) return channelMatch[1];

    const legacyMatch = parsed.pathname.match(/^\/(c|user)\/([a-zA-Z0-9_.-]+)/);
    if (legacyMatch) return legacyMatch[2];

    return null;
  } catch {
    return null;
  }
}

export function isYouTubeShortsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.pathname.startsWith('/shorts/');
  } catch {
    return false;
  }
}

export function getCurrentPathname(): string {
  return window.location.pathname;
}

export function getCurrentUrl(): string {
  return window.location.href;
}
