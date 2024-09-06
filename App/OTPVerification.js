// OTPVerification.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./FirebaseConfig"; // Adjust the path

export default function OTPVerification({ route, navigation }) {
  const { email, otp: expectedOtp, password } = route.params;
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    if (otp !== expectedOtp) {
      Alert.alert("Invalid OTP", "The OTP you entered is incorrect.");
      return;
    }

    try {
      // Ensure password is not empty
      if (!password) {
        throw new Error("Password is required.");
      }

      // Create the user after successful OTP verification
      await createUserWithEmailAndPassword(auth, email, password);

      // Create a document in Firestore to store OTP verification status
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), { otpVerified: true });
      }

      Alert.alert("Success", "User created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error creating user:", error.message);
      Alert.alert("Error", "An error occurred while creating the user.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter OTP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
});
