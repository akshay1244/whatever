import { MessageType } from '../messaging/types';
import { onMessage, sendTabMessage } from '../messaging/bridge';
import { URLS } from '../shared/constants';
import type { TabState } from '../shared/types';
import { useSettingsStore, syncStoreWithStorage } from '../storage/store';

syncStoreWithStorage();

const tabStates = new Map<number, TabState>();

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: URLS.welcomePage });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabStates.delete(tabId);
});

onMessage(MessageType.CONTENT_FILTERED, (payload, sender) => {
  const tabId = sender.tab?.id;
  if (!tabId) return;

  const state = tabStates.get(tabId) || {
    isActive: true,
    platform: null,
    region: 'unknown',
    videosHidden: 0,
    shortsHidden: 0,
    totalScanned: 0,
    lastUpdated: Date.now(),
  };

  if (payload.isShort) {
    state.shortsHidden += payload.count;
  } else {
    state.videosHidden += payload.count;
  }
  state.lastUpdated = Date.now();

  tabStates.set(tabId, state);

  const total = state.videosHidden + state.shortsHidden;
  if (useSettingsStore.getState().settings.showBadge && total > 0) {
    chrome.action.setBadgeText({ text: total.toString(), tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#ff5b3a', tabId });
  }

  sendTabMessage(tabId, MessageType.TAB_STATE_UPDATED, { state });
});

onMessage(MessageType.GET_TAB_STATE, (payload, sender) => {
  const tabId = payload.tabId || sender.tab?.id;
  if (tabId) {
    const state = tabStates.get(tabId);
    if (state) {
      chrome.runtime.sendMessage({
        type: MessageType.TAB_STATE_UPDATED,
        payload: { state }
      }).catch(() => {});
    }
  }
});

