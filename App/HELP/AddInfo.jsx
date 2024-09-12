import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


  const AddInfo = () => {
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
      <Text style={styles.additionalText}>RA 7277 - Magna Carta of Disabled Persons</Text>
      
      <View style={styles.textBox}>
        <Text style={styles.bxTitle}>
        A law enacted in the Philippines in 1992. It aims to promote the rights and welfare of persons with disabilities (PWDs) by ensuring their equal opportunities, access to education, employment, healthcare, and social services. The law mandates the elimination of discrimination against PWDs and provides guidelines for the government and private sectors to create an inclusive environment.
        </Text>
      </View>

      <TouchableOpacity
      style={styles.navButton2}
      onPress={() => navigation.navigate('AddInfo2')}
    >
      <Text style={[styles.navButtonText, { textAlign: 'center' }]}>More Info</Text>
    </TouchableOpacity>
  
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
      top: -70,
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
      width: wp(87),
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
      width: wp(87),
      top: -40,
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderRadius: 5,
      },
  });

  export default AddInfo;
