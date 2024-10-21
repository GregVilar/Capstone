import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Forum = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Forum</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('DiscussionGeneral')}>
        <DiscussionGeneral />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('DiscussionLandmarks')}>
        <DiscussionLandmarks />
      </TouchableOpacity>
    </View>
  );
};

const DiscussionGeneral = () => (
  <View style={styles.additionalContainer}>
    <Text style={styles.DiscussHeader}>General Discussion</Text>
    <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
  </View>
);

const DiscussionLandmarks = () => (
  <View style={styles.additionalContainer2}>
    <Text style={styles.DiscussHeader}>Missing Landmarks</Text>
    <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
  </View>
);

const DiscussionGeneral1 = () => (
  <View style={styles.additionalContainer3}>
    <Text style={styles.DiscussHeader}>General Discussion</Text>
    <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
  </View>
);

const DiscussionLandmarks1 = () => (
  <View style={styles.additionalContainer4}>
    <Text style={styles.DiscussHeader}>Missing Landmarks</Text>
    <Text style={styles.DiscussSubHeader}>Share Experiences and Story</Text>
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
    padding: 40,
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 40,
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
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    position: 'absolute',
    top: 200,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  additionalContainer2: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    position: 'absolute',
    top: 340,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  additionalContainer3: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    position: 'absolute',
    top: 480,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  additionalContainer4: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    paddingTop: 40,
    borderRadius: 30,
    position: 'absolute',
    top: 620,
    left: 40,
    right: 40,
    zIndex: 10,
  },
  DiscussHeader: {
    fontSize: 30,
    left: 40,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    top: -36,
  },
  DiscussSubHeader: {
    fontSize: 12,
    left: 40,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    top: -40,
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
  },
  bxContent: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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

export default Forum;
