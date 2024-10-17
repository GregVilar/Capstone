import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./FirebaseConfig"; // Adjust the path as needed
import { useTranslation } from 'react-i18next'; // Import the translation hook

export default function OTPVerification({ route, navigation }) {
  const { email, otp: expectedOtp, password } = route.params;
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]); // Array with six boxes

  // Refs to focus on the next input
  const inputRefs = useRef([]);
  
  const { t } = useTranslation(); // Initialize the translation hook

  const handleOtpChange = (text, index) => {
    if (text.length === 1) {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = text;
      setOtpArray(newOtpArray);

      // Move focus to next input box if available
      if (index < otpArray.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (text.length === 0 && otpArray[index] !== "") {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = "";
      setOtpArray(newOtpArray);

      // Move focus to previous input box if available
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpEntered = otpArray.join("");
    if (otpEntered !== expectedOtp) {
      Alert.alert(t("otpVerification.invalidOtp"), t("otpVerification.invalidOtpMessage"));
      return;
    }

    try {
      // Ensure password is not empty
      if (!password) {
        throw new Error(t("otpVerification.passwordRequired"));
      }

      // Create the user after successful OTP verification
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the user object

      console.log("Creating Firestore document for user ID:", user.uid); // Log user ID
      // Create a document in Firestore to store OTP verification status and user ID
      await setDoc(doc(db, "users", user.uid), { 
        otpVerified: true,
        userId: user.uid, // Store the user ID here
      });

      console.log("Document created successfully"); // Log success
      Alert.alert(t("otpVerification.success"), t("otpVerification.userCreated"));
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error creating user:", error.message);
      Alert.alert(t("otpVerification.error"), t("otpVerification.errorCreatingUser"));
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("otpVerification.title")}</Text>
        <Text style={styles.subtitle}>{t("otpVerification.subtitle")}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.subtitle2}>{t("otpVerification.subtitle2", { email })} {"\n"} </Text>
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
          <Text style={styles.buttonText}>{t("otpVerification.verifyButton")}</Text>
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
    textAlign: 'center',
    color: 'tomato',
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'tomato',
    textAlign: 'center',
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
