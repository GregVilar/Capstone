import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiscussionLandmarks = () => {
  const navigation = useNavigation();

  // return (
  //   <View style={styles.additionalContainer}>
  //     <Text style={styles.DiscussHeader}>General Discussion</Text>
  //     <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
  //     <Button
  //       title="Go to Landmarks"
  //       onPress={() => navigation.navigate('DiscussionLandmarks')}
  //     />
  //   </View>
  // );

// const ImageComponent = () => (
//   <Image
//     source={require('../assets/images/DiscussHeader.png')}
//     style={styles.image}
//   />
// );
return (
  <View style={styles.outerContainer}>
    <ImageComponent />
    <View style={styles.container}>
      <Text style={styles.title}>Forum</Text>
      <Text style={styles.subtitle}>Page</Text>
    </View>
    <AdditionalContainer/>
  </View>
);

};

const ImageComponent = () => (
  <Image
    source={require('../../assets/images/DiscussHeader.png')}
    style={styles.image}
  />
);

const AdditionalContainer = ({ navigation }) => (
  <View style={styles.additionalContainer}>
    <Text style={styles.additionalText}>General Discussion</Text>
    <Text style={styles.additionalText1}>Share Experiences and Story</Text>
   
  </View>
);

// const ThreadContainer= () =>(
//   <View style={styles.threadContainer}>
//     <Text style={styles.textLocation}>Jollibee</Text>
//     <Text style={styles.textDiscussHeader}>Missing Landmark- Jollibee Vicente Cruz</Text>
//     <Text style={styles.textDiscussContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a varius sapien. Integer lobortis lectus a dolor scelerisque, vel laoreet arcu imperdiet. Vestibulum sagittis neque eu neque placerat, nec tempor dui scelerisque. Praesent enim lacus, efficitur a tempus a, lobortis a libero. Aliquam vel ex imperdiet, volutpat lorem sed, fringilla dui.</Text>
//      </View>
     
// );
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
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'tomato',
  },
  image: {
    width: '100%',
    height: 220, // Adjust as needed
    position: 'absolute',
    bottom: 440, // Ensure image is positioned at the bottom
    zIndex: 1, // Ensure image is below the main container
  },
  additionalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5757',
    paddingBottom: 500,
    borderRadius: 30,
    position: 'absolute', 
    top:290,
    left: 0, 
    right: 0, 
    zIndex: 3, 
  },
  threadContainer: {
    justifyContent: 'center',
    backgroundColor: '#FFF7F7',
    padding: 50,
    position: 'absolute',
    width:350, 
    top:120,
  },
  additionalText: {
    fontSize: 25,
    marginTop: 30,
    right:80,
    fontWeight: 'bold',
    color: 'white',
  },
  additionalText1: {
    fontSize: 15,
    marginTop: 10,
    right:90,
    fontWeight: 'bold',
    color: 'white',
  },
  textLocation:{
    fontWeight: 'bold',
    marginTop: 10,
    right:110,
    color: 'black',
    position: 'absolute',
    bottom:80,
    left: 50, 
    right: 0, 
    fontSize: 10,
  },
  textDiscussHeader:{
    fontWeight: 'bold',
    marginTop: 0,
    left: 50, 
    bottom:60,
    right: 0,
    position: 'absolute',
    color: 'black',
    fontSize: 10,
  },
  textDiscussContent:{
    fontWeight: 'bold',
    color: 'black',
    alignContent:'center',
    textAlign:'center',
    left: 0, 
    bottom:10,
    right: 0,
    position: 'absolute',
    fontSize: 10,
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
export default DiscussionLandmarks;
