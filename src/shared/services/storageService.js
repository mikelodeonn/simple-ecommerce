import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  save: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to storage", e);
    }
  },
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Error getting from storage", e);
      return null;
    }
  }
};