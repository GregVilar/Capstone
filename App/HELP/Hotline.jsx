import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useColorInversion } from '../ColorInversionContext'; // Import the color inversion context

const Hotline = () => {
  const navigation = useNavigation();
  const { isInverted } = useColorInversion(); // Get the inversion state

  return (
    <View style={[styles.outerContainer, isInverted && styles.invertedOuterContainer]}>
      <ImageComponent />
      <View style={[styles.container, isInverted && styles.invertedContainer]}>
        <Text style={[styles.title, isInverted && styles.invertedTitle]}>Help</Text>
        <Text style={[styles.subtitle, isInverted && styles.invertedSubtitle]}>Page</Text>
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

const AdditionalContainer = ({ navigation, isInverted }) => (
  <View style={[styles.additionalContainer, isInverted && styles.invertedAdditionalContainer]}>
    <Text style={[styles.additionalText, isInverted && styles.invertedAdditionalText]}>
      Emergency Hotlines
    </Text>

    <View style={[styles.textBox, isInverted && styles.invertedTextBox]}>
      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        Philippine Red Cross
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        143
      </Text>

      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        Philippine National Police
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        911 or 117
      </Text>

      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        Bureau of Fire Protection
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        911
      </Text>

      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        Department of Health
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        911
      </Text>

      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        Department of Social Welfare and Development
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        16545
      </Text>

      <Text style={[styles.bxTitle, isInverted && styles.invertedBxTitle]}>
        National Council on Disability Affairs
      </Text>
      <Text style={[styles.bxContent, isInverted && styles.invertedBxContent]}>
        (632) 8932-6422
      </Text>
    </View>

    <TouchableOpacity
      style={[styles.Button, isInverted && styles.invertedButton]}
      onPress={() => navigation.goBack()}
    >
      <Text style={[styles.BTNtitle, isInverted && styles.invertedBTNtitle]}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  invertedOuterContainer: {
    backgroundColor: '#000', // Change to your desired inverted color
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
    backgroundColor: '#333', // Change to your desired inverted color
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  invertedTitle: {
    color: 'lightgray', // Change to your desired inverted title color
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  invertedSubtitle: {
    color: '#02e3f7', // Change to your desired inverted subtitle color
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
    paddingTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  invertedAdditionalContainer: {
    backgroundColor: '#333', // Change to your desired inverted additional container color
  },
  additionalText: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    top: -50,
  },
  invertedAdditionalText: {
    color: '#02e3f7', // Change to your desired inverted additional text color
  },
  textBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: 340,
    top: -30,
  },
  invertedTextBox: {
    backgroundColor: 'black', // Change to your desired inverted text box color
  },
  bxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  invertedBxTitle: {
    color: '#fff', // Change to your desired inverted box title color
  },
  bxContent: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d0312d',
    textAlign: 'center',
  },
  invertedBxContent: {
    color: '#02e3f7', // Change to your desired inverted box content color
  },
  Button: {
    top: -30,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 5,
  },
  invertedButton: {
    backgroundColor: 'black', // Change to your desired inverted button color
  },
  BTNtitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  invertedBTNtitle: {
    color: '#fff', // Change to your desired inverted button title color
  },
});

export default Hotline;
