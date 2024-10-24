import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFirestore, doc, setDoc, GeoPoint } from 'firebase/firestore';
import { app } from '../FirebaseConfig'; 
import { getImageUrls } from './getImageUrls'; // Import the function that retrieves image URLs from Firebase Storage

const SpecialMarker = ({ visible, onClose, location, onSave, userId }) => {
  const db = getFirestore(app);
  const [imageUrls, setImageUrls] = useState({});
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    if (visible) {
      console.log('Current Location:', location);
      fetchImageUrls(); // Fetch image URLs when the modal opens
    }
  }, [visible]);

  const fetchImageUrls = async () => {
    const urls = await getImageUrls(); // Retrieve the URLs from Firebase Storage
    setImageUrls(urls); // Store the URLs in state
  };

  // Function to handle image selection
  const handleImageClick = async (imageName) => {
    const selectedUrl = imageUrls[imageName]; // Get the URL of the clicked image
    setSelectedImageUrl(selectedUrl);
    await saveSpecialMarkerLocation(selectedUrl); // Save the selected image's URL to Firestore

    // Call the onSave prop to pass the selected URL and location back to the parent component
    if (onSave) {
      onSave(location, selectedUrl);
    }
  };

  // Save the special marker's location and selected image URL to Firestore
  const saveSpecialMarkerLocation = async (imageUrl) => {
    try {
      await setDoc(doc(db, 'specialMarkers', 'current'), {
        userId: userId, // Store the userId
        location: new GeoPoint(location.latitude, location.longitude),
        imageUrl: imageUrl, // Store the selected image URL
      });
      console.log('Special marker location, image URL, and user ID saved in Firestore');
    } catch (error) {
      console.error('Error saving special marker location:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Add Special Marker</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.imageGrid}>
            {Object.keys(imageUrls).map((imageName, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.imageContainer} 
                onPress={() => handleImageClick(imageName)} // Handle the image click and get the URL
              >
                <Image source={{ uri: imageUrls[imageName] }} style={styles.image} />
                <Text style={styles.imageName}>{imageName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    alignItems: 'center',
    bottom: -180,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  imageContainer: {
    width: '30%', // Adjust width for three images in a row
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  imageName: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SpecialMarker;
