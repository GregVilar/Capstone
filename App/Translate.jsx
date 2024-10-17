import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorInversion } from './ColorInversionContext';
import { FontSizeContext } from './FontSizeContext'; // Import FontSizeContext

const Translate = () => {
  const { t, i18n } = useTranslation();
  const { fontSize } = useContext(FontSizeContext); // Use fontSize from context
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const { isInverted } = useColorInversion();

  useEffect(() => {
    const loadLanguagePreference = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        setLanguage(storedLanguage);
      }
      setLoading(false);
    };

    loadLanguagePreference();
  }, []);

  const toggleLanguage = async () => {
    const newLanguage = language === 'en' ? 'fil' : 'en';
    await AsyncStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <View style={[styles.headerContainer, isInverted && styles.invertedContainer]}>
        <Text style={[styles.headerTitle, isInverted && styles.invertedTitle]}>{t('homeScreen.header')}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { fontSize }, isInverted && styles.invertedTitle]}>{t('homeScreen.title')}</Text>
        <Text style={[styles.subtitle, { fontSize }, isInverted && styles.invertedSubtitle]}>
          {language === 'en' ? 'The Current Language is ' : 'Ang Kasalukuyang Wika ay '}
          <Text style={styles.highlighted}>{language === 'en' ? 'English' : 'Filipino'}</Text>
        </Text>

        <TouchableOpacity style={[styles.button, isInverted && styles.invertedButton]} onPress={toggleLanguage}>
          <Text style={styles.buttonText}>
            {language === 'en' ? 'Switch to Filipino' : 'Switch to English'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff', // Default background color
  },
  invertedOuterContainer: {
    backgroundColor: '#000000', // Black background for inverted mode
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b',
    height: 90, // Adjust height as needed
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2, // Ensure this container is above other content
    position: 'relative',
    padding: 20,
  },
  invertedContainer: {
    backgroundColor: '#333', // Darker background for inverted mode
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray', // Light gray text for inverted mode
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  invertedSubtitle: {
    color: '#FFFFFF', // White text for inverted mode
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'outfit-regular',
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  highlighted: {
    color: 'tomato', // Color change for highlighted text (English/Filipino)
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#185c6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  invertedButton: {
    backgroundColor: '#00BFFF', // Light blue background for inverted mode buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Translate;
