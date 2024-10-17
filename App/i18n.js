// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your translations
import en from './locales/en.json';
import fil from './locales/fil.json';

const loadLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('language');
    // Default to device language if not found in storage
    return storedLanguage ? storedLanguage : Localization.locale.split('-')[0]; // Get the language code (e.g., "en" from "en-US")
  } catch (error) {
    console.error("Failed to load language:", error);
    return 'en'; // Fallback to English in case of error
  }
};

const initializeI18n = async () => {
  const initialLanguage = await loadLanguage();

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3', // To prevent compatibility issues
      fallbackLng: 'en', // Fallback language if none is found
      lng: initialLanguage, // Initialize with stored or device language
      resources: {
        en: { translation: en },
        fil: { translation: fil },
      },
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
    });
};

initializeI18n();

export default i18n;
