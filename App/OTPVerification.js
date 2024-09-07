import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./FirebaseConfig"; // Adjust the path

export default function OTPVerification({ route, navigation }) {
  const { email, otp: expectedOtp, password } = route.params;
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]); // Array with six boxes

  // Refs to focus on the next input
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (text.length === 1) {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = text;
      setOtpArray(newOtpArray);

      // Move focus to next input box if available
      if (index < otpArray.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpEntered = otpArray.join("");
    if (otpEntered !== expectedOtp) {
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
    <View style={styles.outerContainer}>
      {/* Reusing the Help Page title */}
      <View style={styles.container}>
        <Text style={styles.title}>OTP</Text>
        <Text style={styles.subtitle}>Page</Text>
      </View>

      {/* OTP Input section */}
      <View style={styles.innerContainer}>
        <Text style={styles.subtitle2}>Enter OTP sent to {email} {"\n"} </Text>
        <View style={styles.otpContainer}>
          {otpArray.map((otp, index) => (
            <TextInput
              key={index}
              value={otp}
              onChangeText={(text) => handleOtpChange(text, index)}
              style={styles.otpBox}
              maxLength={1}
              keyboardType="numeric"
              ref={(ref) => (inputRefs.current[index] = ref)} // Store ref for each input
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
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
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'tomato',
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    marginBottom: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    width: '100%',
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center OTP boxes horizontally
    alignItems: "center",
    width: "60%", // Adjust width as needed
    marginBottom: 20,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: "#185c6b",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    width: 50,
    height: 50,
    marginHorizontal: 5,
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
