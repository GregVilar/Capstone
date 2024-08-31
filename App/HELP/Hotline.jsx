import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

  const Hotline = () => {
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
      <Text style={styles.additionalText}>Emergency Hotlines</Text>
      
      <View style={styles.textBox}>
        <Text style={styles.bxTitle}>
          Philippine Red Cross
        </Text>
        <Text style={styles.bxContent}>
          143
        </Text>

        <Text style={styles.bxTitle}>
          Philippine National Police
        </Text>
        <Text style={styles.bxContent}>
          911 or 117
        </Text>

        <Text style={styles.bxTitle}>
          Bureau of Fire Protection
        </Text>
        <Text style={styles.bxContent}>
          911
        </Text>

        <Text style={styles.bxTitle}>
          Department of Health
        </Text>
        <Text style={styles.bxContent}>
          911
        </Text>

        <Text style={styles.bxTitle}>
        Department of Social Welfare and Development
        </Text>
        <Text style={styles.bxContent}>
        16545
        </Text>

        <Text style={styles.bxTitle}>
        National Council on Disability Affairs
        </Text>
        <Text style={styles.bxContent}>
        (632) 8932-6422
        </Text>
      </View>
  
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
      paddingTop: 50,
      borderRadius: 30,
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 3, 
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
    textBox: {
      backgroundColor: '#fff', // Light gray background
      padding: 15,
      borderRadius: 5,
      marginBottom: 20, // Space between the box and the button
      width: 340, 
      top: -30,
    },
    bxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    bxContent: {
      marginTop: 5,
      marginBottom: 10,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#d0312d',
      textAlign: 'center',
    },
    Button: {
      top: -30,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 140,
      borderRadius: 5,
    },
    BTNtitle: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default Hotline;
