import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const { t } = useTranslation(); // Use the translation hook

  const handlePasswordReset = async () => {
    try {
      if (!email) {
        throw new Error(t("forgotPasswordPage.enterEmail")); // Use translation for error message
      }

      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", t("forgotPasswordPage.sendButton"));
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
        <Text style={styles.title}>{t("forgotPasswordPage.title")}</Text>
        <Text style={styles.subtitle}>{t("forgotPasswordPage.subtitle")}</Text>
      </View>

      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("forgotPasswordPage.enterEmail")} // Use translation for placeholder
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>{t("forgotPasswordPage.sendButton")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ButtonBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.BTNtitle}>{t("forgotPasswordPage.goBackButton")}</Text>
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
    paddingTop: 70,
    paddingBottom: 15,
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
  ButtonBack: {
    top: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  BTNtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
