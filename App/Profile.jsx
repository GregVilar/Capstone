import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile= () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.subtitle}>Welcome to profile screen! Work in Progress</Text>
      {/* Add more content here as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'outfit-regular',
    color: '#555',
  },
});

export default Profile;
