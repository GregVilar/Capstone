import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // for generating unique file names
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker'; // Updated import

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const storage = getStorage();
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          setEmail(currentUser.email);

          // Get the username from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || '');
            // Set the profile image if it exists
            setProfileImage(userData.profileImage || null); 
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Update Firestore document with new username
        await updateDoc(doc(db, 'users', currentUser.uid), { username });
        console.log('Username updated successfully!');
      } catch (error) {
        console.error('Error updating username: ', error);
      }
    }

    if (profileImage) {
      uploadImage(profileImage);
    } else {
      console.log('Email:', email, 'Username:', username);
    }
  };

  const selectImage = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      console.log('User cancelled image picker');
    } else {
      setProfileImage(result.uri); // Set the selected image URI
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const user = auth.currentUser;
    const fileName = uuidv4();
    const imageRef = ref(storage, `profileImages/${user.uid}/${fileName}`);

    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(imageRef, blob)
      .then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await saveProfileImage(downloadURL);
      })
      .catch((error) => {
        console.log('Error uploading image: ', error);
        Alert.alert('Error', 'Failed to upload image');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const saveProfileImage = async (imageUrl) => {
    const user = auth.currentUser;
    const userDocRef = doc(db, 'users', user.uid);

    try {
      await updateDoc(userDocRef, { profileImage: imageUrl });
      Alert.alert('Success', 'Profile image uploaded successfully');
    } catch (error) {
      console.log('Error saving image URL: ', error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.logoText}>Select Image</Text>
          )}
        </TouchableOpacity>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={uploading}>
              <Text style={styles.saveButtonText}>{uploading ? 'Uploading...' : 'Save'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#185c6b',
    height: hp('10%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'tomato',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: hp('10%'), // Adjust to create space below the title container
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'), // Make it circular
    borderRadius: wp('15%'), // Half of width to make it circular
    backgroundColor: '#ccc', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185c6b', // Change this to your logo color
  },
  input: {
    width: wp('80%'),
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#185c6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default Profile;