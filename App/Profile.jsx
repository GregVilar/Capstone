import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    // Handle the save functionality here
    console.log('Email:', email, 'Username:', username);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>

      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.profileImage}>
          {/* Placeholder for logo or any content */}
          <Text style={styles.logoText}>Logo</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  },
  title: {
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
});

export default Profile;
