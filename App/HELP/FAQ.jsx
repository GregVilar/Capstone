import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useColorInversion } from '../ColorInversionContext'; // Assuming you have a context for color inversion

const FAQ = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isInverted } = useColorInversion(); // Get the color inversion state

  return (
    <View style={styles.outerContainer}>
      <ImageComponent />
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>{t('faq.title')}</Text>
        <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>{t('faq.subtitle')}</Text>
      </View>
      <AdditionalContainer navigation={navigation} isInverted={isInverted} />
    </View>
  );
};

const ImageComponent = () => (
  <Image
    source={require('../../assets/images/FAQ-1.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ navigation, isInverted }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.additionalContainer, isInverted && styles.invertedAdditionalContainer]}>
      <Text style={[styles.additionalText, isInverted && styles.invertedAdditionalText]}>{t('faq.faqTitle')}</Text>

      {/* Repeat text boxes as needed */}
      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>{t('faq.speechToTextQuestion')}</Text>
        <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>{t('faq.speechToTextAnswer')}</Text>
      </View>

      {/* Additional text boxes */}
      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>{t('faq.speechToTextQuestion')}</Text>
        <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>{t('faq.speechToTextAnswer')}</Text>
      </View>

      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>{t('faq.speechToTextQuestion')}</Text>
        <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>{t('faq.speechToTextAnswer')}</Text>
      </View>

      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>{t('faq.speechToTextQuestion')}</Text>
        <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>{t('faq.speechToTextAnswer')}</Text>
      </View>

      <TouchableOpacity
        style={[styles.Button, isInverted && styles.invertedButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.BTNtitle, isInverted && styles.invertedBTNtitle]}>{t('faq.goBackButton')}</Text>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#185c6b',
    height: hp('10'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  invertedContainer: {
    backgroundColor: '#444', // Change to inverted color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray', // Change to inverted color
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  invertedSubtitle: {
    color: '#02e3f7', // Change to inverted color
  },
  image: {
    width: wp('100%'),
    height: hp('30%'),
    position: 'absolute',
    bottom: hp(54),
    zIndex: 1,
  },
  additionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5757',
    height: hp(65),
    paddingTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  invertedAdditionalContainer: {
    backgroundColor: '#444', // Change to inverted color
  },
  additionalText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    top: -40,
  },
  invertedAdditionalText: {
    color: '#02e3f7', // Change to inverted color
  },
  textBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: wp(87),
    top: -30,
  },
  invertedTextBox: {
    backgroundColor: 'black', // Change to inverted color
  },
  bxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  invertedBxTitle: {
    color: '#02e3f7', // Change to inverted color
  },
  bxContent: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  invertedBxContent: {
    color: 'white', // Change to inverted color
  },
  Button: {
    width: wp(87),
    top: -30,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: wp(35),
    borderRadius: 5,
  },
  invertedButton: {
    backgroundColor: 'black', // Change to inverted color
  },
  BTNtitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedBTNtitle: {
    color: '#fff', // Change to inverted color
  },
});

export default FAQ;
