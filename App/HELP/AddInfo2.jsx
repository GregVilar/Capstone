import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useColorInversion } from '../ColorInversionContext'; // Import the context

const AddInfo2 = () => {
  const navigation = useNavigation();
  const { t } = useTranslation(); // Initialize the translation function
  const { isInverted } = useColorInversion(); // Get the inversion state

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <ImageComponent />
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>
          {t('faq1.title')}
        </Text>
        <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>
          {t('faq1.subtitle')}
        </Text>
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
      <Text style={[styles.additionalText, isInverted && styles.invertedAdditionalText]}>
        {t('faq1.raTitle')}
      </Text>

      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
          {t('faq1.raDescription')}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.Button, isInverted && styles.invertedButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.BTNtitle, { textAlign: 'center' }, isInverted && styles.invertedBTNtitle]}>
          {t('faq1.goBackButton')}
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
    zIndex: 2,
    position: 'absolute',
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
    height: hp("30%"),
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
    backgroundColor: '#444',
  },
  additionalText: {
    fontSize: 26,
    marginTop: 35,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    top: -70,
  },
  invertedAdditionalText: {
    color: '#02e3f7',
  },
  textBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: wp(90),
    top: -60,
  },
  invertedTextBox: {
    backgroundColor: 'black',
  },
  bxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'justify',
  },
  invertedBxTitle: {
    color: 'white', // Adjust for inverted mode
  },
  Button: {
    width: wp(87),
    top: -30,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  invertedButton: {
    backgroundColor: '#000',
  },
  BTNtitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedBTNtitle: {
    color: 'white',
  },
});

export default AddInfo2;
