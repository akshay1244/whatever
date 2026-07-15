import { MessageType, AdiosMessage, MessagePayloads } from './types';

export function sendMessage<T extends MessageType>(
  type: T,
  payload: MessagePayloads[T]
): void {
  chrome.runtime.sendMessage({ type, payload }).catch(() => {});
}

export function sendTabMessage<T extends MessageType>(
  tabId: number,
  type: T,
  payload: MessagePayloads[T]
): void {
  chrome.tabs.sendMessage(tabId, { type, payload }).catch(() => {});
}

export function onMessage<T extends MessageType>(
  type: T,
  callback: (payload: MessagePayloads[T], sender: chrome.runtime.MessageSender) => void
): void {
  chrome.runtime.onMessage.addListener((message: AdiosMessage<T>, sender) => {
    if (message && message.type === type) {
      callback(message.payload, sender);
    }
  });
}
