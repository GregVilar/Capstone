import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./FirebaseConfig"; // Adjust the path

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Clear input fields when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        // Handle login logic
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully!");
        navigation.navigate("AuthenticatedScreen"); // Navigate to AuthenticatedScreen after login
      } else {
        // Handle sign-up logic
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created successfully!");
        // Clear inputs after successful sign-up
        setEmail("");
        setPassword("");
        setIsLogin(true); // Switch to login mode
        navigation.navigate("Login"); // Navigate to Login screen after sign-up
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    // Clear inputs when switching between modes
    setEmail("");
    setPassword("");
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
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title={isLogin ? "Login" : "Sign Up"}
          onPress={handleAuthentication}
        />
        <Text style={styles.toggleText} onPress={handleToggle}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Log In"}
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
  toggleText: {
    color: "#3498db",
    textAlign: "center",
    marginTop: 10,
  },
});
