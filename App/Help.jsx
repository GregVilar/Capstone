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
      style={styles.navButton}
      onPress={() => navigation.navigate('FAQScreen')}
    >
      <Text style={styles.navButtonText}>Go to FAQ</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton2}
      onPress={() => navigation.navigate('AddInfo')}
    >
      <Text style={styles.navButtonText}>Additional Info</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton3}
      onPress={() => navigation.navigate('Hotline')}
    >
      <Text style={styles.navButtonText}>Hotline</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton4}
      onPress={() => navigation.navigate('LARG')}
    >
      <Text style={styles.navButtonText}>Rating Guide</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.navButton5}
      onPress={() => navigation.navigate('LARG3')}
    >
      <Text style={styles.navButtonText}>Photo Guide</Text>
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
    padding: 10,
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
    height: 220, // Adjust as needed
    position: 'absolute',
    bottom: 460, // Ensure image is positioned at the bottom
    zIndex: 1, // Ensure image is below the main container
  },
  additionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5757',
    paddingBottom: 100,
    borderRadius: 30,
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
  navButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 140,
    borderRadius: 5,
  },
  navButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navButton2: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 122,
  },
  navButton3: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 150,
  },
  navButton4: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 127,
  },
  navButton5: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 127,
  },
});

export default Help;
