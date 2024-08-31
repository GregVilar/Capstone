import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

  const LARG = () => {
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
        <Text style={styles.WCText}>All rooms are accessible using a wheelchair and has complete accessibility features (Ramps, ground level entrances, elevators)</Text>
      </View>

      <View style={styles.WCContainer}>
        <Image
          source={require('../../assets/images/WC2.png')} 
          style={styles.WCImage}
        />
        <Text style={styles.WCText}>Some rooms are accessible using a wheelchair and lacks accessibility features (Ramps, ground level entrances, elevators) </Text>
      </View>

      <View style={styles.WCContainer}>
        <Image
          source={require('../../assets/images/WC3.png')} 
          style={styles.WCImage}
        />
        <Text style={styles.WCText}>Not accessible </Text>
      </View>

      <TouchableOpacity
      style={styles.navButton2}
      onPress={() => navigation.navigate('LARG2')}
    >
      <Text style={styles.navButtonText}>More Info</Text>
    </TouchableOpacity>
      
      <TouchableOpacity
      style={styles.Button}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.BTNtitle}>Go Back</Text>
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
      backgroundColor: '#fff',
      paddingTop: 70,
      borderRadius: 30,
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 3, 
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
      top: -70,
    },
    Button: {
      top: -30,
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 140,
      borderRadius: 5,
    },
    navButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      navButton2: {
        marginTop: 10,
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 135,
        top: -40,
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
      },
  });

  export default LARG;
