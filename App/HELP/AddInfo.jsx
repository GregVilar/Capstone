import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useColorInversion } from '../ColorInversionContext'; // Adjust the path as necessary
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { FontSizeContext } from '../FontSizeContext'; // Import FontSizeContext

const AddInfo = () => {
  const navigation = useNavigation();
  const { isInverted } = useColorInversion(); // Get the inversion state
  const { t } = useTranslation();
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
    source={require('../../assets/images/FAQ-1.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ navigation, isInverted, fontSize }) => {
  const { t } = useTranslation();

  return (
    <View style={[styles.additionalContainer, isInverted && styles.invertedAdditionalContainer]}>
      <Text style={[styles.additionalText, { fontSize: fontSize }, isInverted && styles.invertedAdditionalText]}>
        {t('addInfo.raTitle')}
      </Text>

      <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
        <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
          {t('addInfo.raDescription')}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.navButton2, isInverted && styles.invertedNavButton]}
        onPress={() => navigation.navigate('AddInfo2')}
      >
        <Text style={[styles.navButtonText, { fontSize: fontSize, textAlign: 'center' }, isInverted && styles.invertedNavButtonText]}>
          {t('addInfo.moreInfo')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.Button, isInverted && styles.invertedButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.BTNtitle, { textAlign: 'center' }, isInverted && styles.invertedBTNtitle]}>
          {t('addInfo.goBack')}
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
    width: wp(85),
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
  navButton2: {
    width: wp(87),
    top: -40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  invertedNavButton: {
    backgroundColor: '#000',
  },
  navButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedNavButtonText: {
    color: 'white',
  },
});

export default AddInfo;
