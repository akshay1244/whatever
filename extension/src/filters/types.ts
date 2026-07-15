import type { ContentItem } from '../shared/types';
import type { DetectionResult } from '../detectors/types';

export enum FilterMode {
  HIDE = 'hide',
  BLUR = 'blur',
  REPLACE = 'replace',
  WARN = 'warn',
}

export interface FilterResult {
  success: boolean;
  modeApplied: FilterMode;
  error?: string;
}

export interface Filter {
  readonly mode: FilterMode;
  apply(item: ContentItem, detection: DetectionResult): FilterResult;
  remove(item: ContentItem): void;
}
