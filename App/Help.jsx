import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Help = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <ImageComponent />
      <View style={styles.container}>
        <Text style={styles.title}>Help</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>
      <AdditionalContainer navigation={navigation} />
    </View>
  );
};

const ImageComponent = () => (
  <Image
    source={require('../assets/images/FAQ-1.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ navigation }) => (
  <View style={styles.additionalContainer}>
    <Text style={styles.additionalText}>Help Portal</Text>
    <TouchableOpacity
      style={styles.faqButton}
      onPress={() => navigation.navigate('FAQScreen')}
    >
      <Text style={styles.faqButtonText}>Go to FAQ</Text>
    </TouchableOpacity>
  </View>
);

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
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2, // Ensure this container is above the image
    position: 'absolute', // Positioned relative to the outerContainer
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  image: {
    width: '100%',
    height: 200, // Adjust as needed
    position: 'absolute',
    bottom: 460, // Ensure image is positioned at the bottom
    zIndex: 1, // Ensure image is below the main container
  },
  additionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5757',
    paddingBottom: 400,
    borderRadius: 10,
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    zIndex: 3, 
  },
  additionalText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  faqButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 140,
    borderRadius: 5,
  },
  faqButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Help;
