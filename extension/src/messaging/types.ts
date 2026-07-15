import type { TabState } from '../shared/types';
import type { DetectionResult } from '../detectors/types';

/**
 * All valid message types sent between extension contexts.
 */
export enum MessageType {
  // Popup -> Background
  GET_TAB_STATE = 'GET_TAB_STATE',
  TOGGLE_EXTENSION = 'TOGGLE_EXTENSION',

  // Background -> Popup
  TAB_STATE_UPDATED = 'TAB_STATE_UPDATED',

  // Content -> Background
  CONTENT_FILTERED = 'CONTENT_FILTERED',
  CONTENT_DETECTED = 'CONTENT_DETECTED',

  // Background -> Content
  SETTINGS_CHANGED = 'SETTINGS_CHANGED',
}

/**
 * Message payloads.
 */
export interface MessagePayloads {
  [MessageType.GET_TAB_STATE]: { tabId?: number };
  [MessageType.TOGGLE_EXTENSION]: { enabled: boolean };
  [MessageType.TAB_STATE_UPDATED]: { state: TabState };
  [MessageType.CONTENT_FILTERED]: { count: number; isShort: boolean };
  [MessageType.CONTENT_DETECTED]: { result: DetectionResult };
  [MessageType.SETTINGS_CHANGED]: undefined;
}

/**
 * Standard message format.
 */
export interface AdiosMessage<T extends MessageType> {
  type: T;
  payload: MessagePayloads[T];
}
