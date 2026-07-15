import type { FilterMode } from '../filters/types';
import type { PlatformId } from '../shared/constants';
import { ConfidenceLevel as DetConfidenceLevel } from '../detectors/types';

export interface AdiosSettings {
  enabled: boolean;
  filterMode: FilterMode;
  sensitivity: DetConfidenceLevel;
  platforms: Record<PlatformId, PlatformSettings>;
  showBadge: boolean;
}

export interface PlatformSettings {
  enabled: boolean;
  filterModeOverride: FilterMode | null;
}

export interface ChannelLists {
  trusted: string[];
  blocked: string[];
}

export interface AdiosStatistics {
  totalHidden: number;
  totalScanned: number;
  byPlatform: Record<string, number>;
  dailyHidden: Record<string, number>;
}
