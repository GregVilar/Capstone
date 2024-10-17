import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useColorInversion } from './ColorInversionContext'; // Adjust the path
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { FontSizeContext } from './FontSizeContext'; // Import FontSizeContext
import './i18n'; // Import i18n configuration

const Help = () => {
  const navigation = useNavigation();
  const { isInverted } = useColorInversion(); // Get the inversion state
  const { t } = useTranslation(); // Use the translation hook
  const { fontSize } = useContext(FontSizeContext); // Use fontSize from context

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <ImageComponent />
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>
          {t('help.title')}
        </Text>
        <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>
          {t('help.subtitle')}
        </Text>
      </View>
      <AdditionalContainer navigation={navigation} isInverted={isInverted} fontSize={fontSize} />
    </View>
  );
};

const ImageComponent = () => (
  <Image
    source={require('../assets/images/FAQ-1.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ navigation, isInverted, fontSize }) => {
  const { t } = useTranslation(); // Use the translation hook

  return (
    <View style={[styles.additionalContainer, isInverted && styles.invertedAdditionalContainer]}>
      <Text style={[styles.additionalText, { fontSize: fontSize }, isInverted && styles.invertedAdditionalText]}>
        {t('help.portal')}
      </Text>
      <TouchableOpacity
        style={[styles.navButton, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('FAQScreen')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('help.goToFAQ')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton2, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('AddInfo')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('help.additionalInfo')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton3, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('Hotline')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('help.hotline')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton4, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('LARG')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('help.ratingGuide')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton5, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('LARG3')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('help.photoGuide')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  invertedOuterContainer: {
    backgroundColor: '#000',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b',
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2, // Ensure this container is above the image
    position: 'absolute', // Positioned relative to the outerContainer
    top: 0,
    left: 0,
    right: 0,
  },
  invertedContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  invertedSubtitle: {
    color: '#02e3f7',
  },
  image: {
    width: wp('100%'),
    height: hp("30%"), // Adjust as needed
    position: 'absolute',
    bottom: hp(54), // Ensure image is positioned at the bottom
    zIndex: 1, // Ensure image is below the main container
  },
  additionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5757',
    height: hp(65),
    paddingBottom: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  invertedAdditionalContainer: {
    backgroundColor: '#444',
  },
  additionalText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedAdditionalText: {
    color: '#02e3f7',
  },
  navButton: {
    width: wp('90%'),
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: wp(35),
    borderRadius: 5,
  },
  invertedNavButton: {
    backgroundColor: '#000', // Black background for inverted buttons
  },
  navButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedNavButtonText: {
    color: 'white', // White text for inverted buttons
  },
  navButton2: {
    width: wp('90%'),
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  navButton3: {
    width: wp('90%'),
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  navButton4: {
    width: wp('90%'),
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  navButton5: {
    width: wp('90%'),
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default Help;
