import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const CustomMarker = ({ imageUrl }) => {
  return (
    <View style={styles.markerContainer}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.markerImage} 
        resizeMode="contain" // or "cover", based on your needs
      />
    </View>
  );
};

const styles = StyleSheet.create({
    markerContainer: {
      width: 75, // Desired width (make it a square)
      height: 75, // Desired height (equal to width)
      borderRadius: 37.5, // Half of the width/height for a circular shape
      overflow: 'hidden', // Ensures any overflow from the image is hidden
      justifyContent: 'center',
      alignItems: 'center',
    },
    markerImage: {
      width: '100%', // Make the image take the full width of the container
      height: '100%', // Make the image take the full height of the container
    },
  });
  

export default CustomMarker;
