import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        throw new Error("Please enter your email address.");
      }

      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
      setEmail(""); // Clear the email field
      navigation.navigate("Login"); // Navigate back to Login screen
    } catch (error) {
      console.error("Password reset error:", error.message);
      Alert.alert("Password Reset Error", error.message);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset</Text>
        <Text style={styles.title2}>Password</Text>
      </View>

      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Send Password Reset Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#185c6b',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
