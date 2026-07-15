import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { chromeStorage } from './chrome-storage';
import { DEFAULT_SETTINGS } from './defaults';
import type { AdiosSettings } from './types';
import { STORAGE_KEYS, CURRENT_SETTINGS_VERSION } from '../shared/constants';

interface SettingsState {
  settings: AdiosSettings;
  updateSettings: (partial: Partial<AdiosSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,

      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),

      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: STORAGE_KEYS.settings,
      storage: createJSONStorage(() => chromeStorage),
      version: CURRENT_SETTINGS_VERSION,
      migrate: (persistedState: any) => {
        return persistedState;
      },
    }
  )
);

export function syncStoreWithStorage() {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes[STORAGE_KEYS.settings]) {
      useSettingsStore.persist.rehydrate();
    }
  });
}
