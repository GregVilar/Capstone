// SignUp.js
import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import sendOTP from "./sendOTP"; // Import your OTP sending function

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, [])
  );

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      // Check if email and password are provided
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Send OTP via Brevo
      await sendOTP(email, otp);

      // Store OTP and other data in Firestore
      await setDoc(doc(db, "otp", email), { otp, createdAt: new Date() });

      console.log("OTP sent!");

      // Clear input fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to OTP Verification Page
      navigation.navigate("OTPVerification", { email, otp, password }); // Pass the password here
    } catch (error) {
      console.error("Sign-up error:", error.message);
      Alert.alert("Sign-up Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/Pwdaan-Logo.png")}
        style={styles.logoImage}
      />
      <View style={styles.bottomBox}>
        <Text style={styles.desc}>PWDaan</Text>
        <Text style={styles.desc3}>
          A PWD Accessibility Crowdsourcing Native Mobile Application
        </Text>

        {/* Email Input */}
        <Text style={styles.desc2}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <Text style={styles.desc2}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <Text style={styles.desc2}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconContainer}>
            <Icon
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>

        <Button
          title="Sign Up"
          onPress={handleSignUp}
        />
        <Text style={styles.toggleText} onPress={() => navigation.navigate("Login")}>
          Already have an account? Log In
        </Text>
      </View>
    </View>
  );
}

// Add styles here...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoImage: {
    width: 350,
    height: 350,
    marginBottom: 340,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 650,
    backgroundColor: "#185c6b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  desc: {
    fontSize: 45,
    fontFamily: "outfit-bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: -80,
  },
  desc2: {
    fontSize: 12,
    fontFamily: "outfit-bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "left",
    width: "80%",
  },
  desc3: {
    fontSize: 12,
    fontFamily: "outfit-bold",
    color: "#fff",
    marginBottom: 30,
    marginTop: -5,
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    marginLeft: 69,
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 80,
    top: 10,
    zIndex: 1,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 10,
  },
});
