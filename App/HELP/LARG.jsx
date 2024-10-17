import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useColorInversion } from '../ColorInversionContext'; // Assuming you have a context for color inversion

const LARG = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isInverted } = useColorInversion(); // Get the color inversion state

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <ImageComponent />
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>{t('larg.title')}</Text>
        <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>{t('larg.subtitle')}</Text>
      </View>
      <AdditionalContainer t={t} navigation={navigation} isInverted={isInverted} />
    </View>
  );
};

const ImageComponent = () => (
  <Image
    source={require('../../assets/images/FAQ-1.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ t, navigation, isInverted }) => (
  <View style={[styles.additionalContainer, isInverted && styles.invertedAdditionalContainer]}>
    <Text style={[styles.additionalText, isInverted && styles.invertedAdditionalText]}>
      {t('larg.accessibilityRatingGuide')}
    </Text>

    <View style={styles.WCContainer}>
      <Image
        source={require('../../assets/images/WC1.png')}
        style={styles.WCImage}
      />
      <Text style={[styles.WCText, isInverted && styles.invertedWCText]}>{t('larg.accessibleAllRooms')}</Text>
    </View>

    <View style={styles.WCContainer}>
      <Image
        source={require('../../assets/images/WC2.png')}
        style={styles.WCImage}
      />
      <Text style={[styles.WCText, isInverted && styles.invertedWCText]}>{t('larg.accessibleSomeRooms')}</Text>
    </View>

    <View style={styles.WCContainer}>
      <Image
        source={require('../../assets/images/WC3.png')}
        style={styles.WCImage}
      />
      <Text style={[styles.WCText, isInverted && styles.invertedWCText]}>{t('larg.notAccessible')}</Text>
    </View>

    <TouchableOpacity
      style={[styles.navButton2, isInverted && styles.invertedNavButton]}
      onPress={() => navigation.navigate('LARG2')}
    >
      <Text style={[styles.navButtonText, { textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
        {t('larg.moreInfo')}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.Button, isInverted && styles.invertedButton]}
      onPress={() => navigation.goBack()}
    >
      <Text style={[styles.BTNtitle, { textAlign: 'center' }, isInverted && styles.invertedBTNtitle]}>
        {t('larg.goBack')}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  invertedOuterContainer: {
    backgroundColor: '#000', // Inverted outer container color
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
    backgroundColor: '#444', // Inverted container color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray', // Inverted title color
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  invertedSubtitle: {
    color: '#02e3f7', // Inverted subtitle color
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
    backgroundColor: '#FFF',
    height: hp(72),
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
    backgroundColor: '#444', // Inverted additional container color
  },
  additionalText: {
    fontSize: 26,
    width: 300,
    marginTop: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#000',
    top: -45,
  },
  invertedAdditionalText: {
    color: '#02e3f7', // Inverted additional text color
  },
  Button: {
    width: wp(87),
    top: -30,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: wp(35),
    borderRadius: 5,
  },
  invertedButton: {
    backgroundColor: 'black', // Inverted button background
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedNavButtonText: {
    color: 'white', // Inverted navigation button text color
  },
  navButton2: {
    width: wp(87),
    top: -40,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
  },
  invertedNavButton: {
    backgroundColor: 'black', // Inverted navigation button background
  },
  BTNtitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedBTNtitle: {
    color: 'white', // Inverted button title color
  },
  WCContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    top: -60,
    width: '100%',
  },
  WCImage: {
    width: 100,
    height: 100,
    left: 30,
  },
  WCText: {
    left: 60,
    width: 230,
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000',
  },
  invertedWCText: {
    color: '#FFF', // Inverted WC text color
  },
});

export default LARG;
