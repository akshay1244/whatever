/**
 * Adios — Chrome Storage Wrapper
 *
 * Provides a Promise-based interface to chrome.storage.local
 * compatible with Zustand's persist middleware.
 */



export const chromeStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const result = await chrome.storage.local.get(name);
      return result[name] ? JSON.stringify(result[name]) : null;
    } catch (error) {
      console.error(`[Adios Storage] Failed to get ${name}:`, error);
      return null;
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const parsed = JSON.parse(value);
      await chrome.storage.local.set({ [name]: parsed });
    } catch (error) {
      console.error(`[Adios Storage] Failed to set ${name}:`, error);
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      await chrome.storage.local.remove(name);
    } catch (error) {
      console.error(`[Adios Storage] Failed to remove ${name}:`, error);
    }
  },
};
