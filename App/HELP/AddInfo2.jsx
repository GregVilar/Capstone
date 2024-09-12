import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


  const AddInfo2 = () => {
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
      source={require('../../assets/images/FAQ-1.png')}
      style={styles.image}
    />
  );

  const AdditionalContainer = ({ navigation }) => (
    <View style={styles.additionalContainer}>
      <Text style={styles.additionalText}>RA 344 - Accessibility Law</Text>
      
      <View style={styles.textBox}>
        <Text style={styles.bxTitle}>
        a Philippine law enacted in 1983 to enhance the mobility of persons with disabilities (PWDs) by requiring the installation of accessibility features in public buildings, transportation, and infrastructure. The law mandates that facilities such as ramps, handrails, and elevators be provided in public and private establishments to ensure that PWDs, the elderly, and others with mobility challenges can access these spaces safely and comfortably.
        </Text>
      </View>
  
      <TouchableOpacity
      style={styles.Button}
      onPress={() => navigation.goBack()}
    >
      <Text style={[styles.BTNtitle, { textAlign: 'center' }]}>Go Back</Text>
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
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#185c6b',
      height: hp('10'),
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
      height: hp(58),
      paddingTop: 40,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 3, 
    },
    additionalText: {
      fontSize: 26,
      marginTop: 35,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      top: -100,
    },
    textBox: {
      backgroundColor: '#fff', // Light gray background
      padding: 15,
      borderRadius: 5,
      marginBottom: 20, // Space between the box and the button
      width: wp(85), 
      top: -60,
    },
    bxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'justify',
    },
    bxContent: {
      marginTop: 5,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    Button: {
      width: wp(85),
      top: -30,
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderRadius: 5,
    },
    BTNtitle: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
      navButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      navButton2: {
        marginTop: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 135,
        top: -50,
      },
  });

  export default AddInfo2;
