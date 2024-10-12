import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


  const LARG3 = () => {
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
      <Text style={styles.additionalText}>Location Accessibility Rating Guide</Text>

      <View style={styles.WCContainer}>
        <Image
          source={require('../../assets/images/WC1.png')} 
          style={styles.WCImage}
        />
          <Image
          source={require('../../assets/images/ACCESS.png')} 
          style={styles.WCImage2}
        />
        
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
      height: hp('13'),
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
      backgroundColor: '#FFF',
      height: hp(60),
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
      width: wp(70),
      marginTop: 10,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#000',
      top: -70,
    },
    Button: {
      width: wp(87),
      top: -30,
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: wp(35),
      borderRadius: 5,
    },
    BTNtitle: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    WCContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        top: -60,
        width: wp('100%'),
      },
      WCImage: {
        width: wp(20), 
        height: hp(10),
        left: 30,  
      },
      WCImage2: {
        width: wp(50), 
        height: hp(30),
        left: 50,  
      },
  });

  export default LARG3;
