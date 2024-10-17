import React, { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import sendOTP from "./sendOTP"; // Import your OTP sending function
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useTranslation } from "react-i18next"; // Import translation hook

export default function SignUp({ navigation }) {
  const { t } = useTranslation(); // Use the translation hook
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
      Alert.alert("Error", t("signUpPage.passwordLabel")); // Use translation for error message
      return;
    }

    try {
      // Check if email and password are provided
      if (!email || !password) {
        throw new Error(t("signUpPage.emailLabel") + " " + t("signUpPage.passwordLabel")); // Use translation for error message
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
      Alert.alert(t("signUpPage.signUpText"), error.message); // Use translation for error message
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
        <Text style={styles.desc2}>{t("signUpPage.emailLabel")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("signUpPage.emailLabel")}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <Text style={styles.desc2}>{t("signUpPage.passwordLabel")}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("signUpPage.passwordLabel")}
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
        <Text style={styles.desc2}>{t("signUpPage.confirmPasswordLabel")}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("signUpPage.passwordLabel")}
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

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{t("signUpPage.signUpButton")}</Text>
        </TouchableOpacity>

        <Text style={styles.toggleText} onPress={() => navigation.navigate("Login")}>
          {t("signUpPage.loginText")}
        </Text>
      </View>
    </View>
  );
}

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
    marginBottom: 380,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 450,
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
    marginBottom: 5,
    marginTop: 0,
  },
  desc2: {
    fontSize: 12,
    fontFamily: "outfit-bold",
    color: "#fff",
    marginBottom: 3,
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
    color: "#fff",
    textAlign: "center",
    fontWeight: 'bold',
    marginTop: -2, // Adjusted margin to move it closer to the button
  },
  signUpButton: {
    backgroundColor: "#FF5757",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
