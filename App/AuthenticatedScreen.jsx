import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from './FirebaseConfig'; // Adjust path if needed

const AuthenticatedScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      navigation.navigate("Login"); // Navigate to Login screen after logout
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user ? user.email : "No user found"}</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 16,
  },
  emailText: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
  },
});

export default AuthenticatedScreen;
