import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "./FirebaseConfig"; // Adjust the path
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon library

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Clear input fields when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      navigation.navigate("AuthenticatedScreen"); // Navigate to AuthenticatedScreen after login
    } catch (error) {
      console.error("Login error:", error.message);
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
        <Text style={styles.toggleText} onPress={() => navigation.navigate("SignUp")}>
          Need an account? Sign Up
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
    marginBottom: 340,
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
    textAlign: "left", // Align text to the left
    width: "80%", // Ensure it takes the full width for alignment
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
    marginBottom: 10, // Add spacing between input fields
  },
  iconContainer: {
    position: "absolute",
    right: 80,
    top: 10,
    zIndex: 1,
  },
  showHideText: {
    color: "#3498db",
    marginLeft: 10,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 10,
  },
});
