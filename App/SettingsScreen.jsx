import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useColorInversion } from './ColorInversionContext'; 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { FontSizeContext } from './FontSizeContext'; // Import FontSizeContext

const SettingsScreen = () => {
  const { isInverted, setIsInverted } = useColorInversion();
  const { t } = useTranslation();
  const { fontSize, setFontSize } = useContext(FontSizeContext); // Use fontSize from context

  const toggleInversion = () => {
    setIsInverted(previousState => !previousState);
  };

  const increaseFontSize = () => {
    setFontSize(previousSize => previousSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(previousSize => Math.max(previousSize - 2, 12)); // Minimum font size
  };

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>{t('settings.title')}</Text>
        <Text style={[styles.subtitle1, isInverted && styles.invertedSubtitle]}>{t('settings.page')}</Text>
      </View>

      <View style={[styles.contentContainer, isInverted && styles.invertedContentContainer]}>
        <View style={styles.toggleContainer}>
          <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>{t('settings.invertColors')}</Text>
          <Switch value={isInverted} onValueChange={toggleInversion} />
        </View>
        <View style={styles.fontSizeContainer}>
          <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>{t('settings.fontSize')}</Text>
          <View style={styles.fontSizeButtons}>
            <TouchableOpacity 
              style={[styles.button, isInverted && styles.invertedButton]} 
              onPress={increaseFontSize}
            >
              <Text style={[styles.buttonText, isInverted && styles.invertedButtonText]}>{t('settings.increase')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, isInverted && styles.invertedButton]} 
              onPress={decreaseFontSize}
            >
              <Text style={[styles.buttonText, isInverted && styles.invertedButtonText]}>{t('settings.decrease')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.currentFontSize, { fontSize, color: isInverted ? 'white' : '#555' }]}>{t('settings.currentFontSize')}: {fontSize}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  invertedOuterContainer: {
    backgroundColor: '#000000', // Black background for inverted mode
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b', // Default header color
    height: hp('10%'), // Adjust height as needed
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2, // Ensure this container is above other content
    position: 'relative',
    padding: 20,
  },
  invertedContainer: {
    backgroundColor: '#333', // Darker header for inverted mode
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  invertedContentContainer: {
    backgroundColor: '#000000', // Black background for content in inverted mode
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'outfit-regular',
    color: '#555',
    textAlign: 'center', // Centering the subtitle text
  },
  invertedSubtitle: {
    color: 'lightgray', // Change color to white for inverted mode
  },
  subtitle1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'tomato',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  fontSizeContainer: {
    marginVertical: 16,
    alignItems: 'center', // Centering content in the font size container
  },
  fontSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF5757',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '45%', // Adjusted for button width
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  invertedButton: {
    backgroundColor: '#00BFFF', // Darker button color for inverted mode
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  invertedButtonText: {
    color:'black',
  },
  currentFontSize: {
    fontSize: 18,
    marginTop: 20,
    color: '#555', // Default color for current font size
  },
});

export default SettingsScreen;
