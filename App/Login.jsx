import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore

  // Clear input fields when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleLogin = async () => {
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the user's OTP is verified
        if (!userData.otpVerified) {
          Alert.alert(
            "OTP Not Verified",
            "Please verify your OTP before logging in. A verification link has been sent to your email."
          );
          // Optionally, sign out the user if they are logged in but OTP is not verified
          await auth.signOut();
          return;
        }

        console.log("User signed in successfully!");
        navigation.navigate("AuthenticatedScreen"); // Navigate to AuthenticatedScreen after login
      } else {
        throw new Error("User data not found in Firestore");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Login Error", error.message);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password screen
    navigation.navigate("ForgotPassword"); // Ensure you have a "ForgotPassword" screen in your navigation stack
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("./../assets/images/Pwdaan-Logo.png")}
          style={styles.logoImage}
        />
        <View style={styles.bottomBox}>
          <Text style={styles.desc}>PWDaan</Text>
          <Text style={styles.desc3}>
            A PWD Accessibility Crowdsourcing Native Mobile Application
          </Text>

          <Text style={styles.desc2}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
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
          <Button
            title="Login"
            onPress={handleLogin}
          />
          <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
            Forgot Password?
          </Text>
          <Text style={styles.toggleText} onPress={() => navigation.navigate("SignUp")}>
            Need an account? Sign Up
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 350,
    height: 350,
    marginBottom: 340, // Adjusted margin to retain previous style
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 380,
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
    marginBottom: 1,
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
  forgotPasswordText: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
