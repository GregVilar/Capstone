import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Send Password Reset Email"
        onPress={handlePasswordReset}
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
