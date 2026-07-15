import type { ContentItem } from '../shared/types';

export enum ConfidenceLevel {
  VERY_UNLIKELY = 'VERY_UNLIKELY',
  POSSIBLY = 'POSSIBLY',
  LIKELY = 'LIKELY',
  VERY_LIKELY = 'VERY_LIKELY',
}

export interface SignalResult {
  signalId: string;
  score: number;
  weight: number;
  override: boolean;
  reasoning?: string;
}

export interface Signal {
  readonly id: string;
  readonly defaultWeight: number;
  analyze(item: ContentItem): Promise<SignalResult> | SignalResult;
}

export interface DetectionResult {
  contentId: string;
  isAi: boolean;
  confidence: ConfidenceLevel;
  rawScore: number;
  signals: SignalResult[];
  timestamp: number;
}
