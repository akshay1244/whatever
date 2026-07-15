import { FilterMode } from '../filters/types';
import { ConfidenceLevel } from '../detectors/types';
import type { AdiosSettings, ChannelLists, AdiosStatistics } from './types';
import { PLATFORM_IDS } from '../shared/constants';

export const DEFAULT_SETTINGS: AdiosSettings = {
  enabled: true,
  filterMode: FilterMode.REPLACE,
  sensitivity: ConfidenceLevel.POSSIBLY,
  showBadge: true,
  platforms: PLATFORM_IDS.reduce((acc, platformId) => {
    acc[platformId] = {
      enabled: true,
      filterModeOverride: null,
    };
    return acc;
  }, {} as AdiosSettings['platforms']),
};

export const DEFAULT_CHANNEL_LISTS: ChannelLists = {
  trusted: [],
  blocked: [],
};

export const DEFAULT_STATISTICS: AdiosStatistics = {
  totalHidden: 0,
  totalScanned: 0,
  byPlatform: {},
  dailyHidden: {},
};
