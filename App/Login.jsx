import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next"; // Import translation hook

const Login = () => {
  const { t } = useTranslation(); // Initialize translation function
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Keep password state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  // Load stored email on screen focus
  useFocusEffect(
    useCallback(() => {
      const loadStoredCredentials = async () => {
        try {
          const storedEmail = await AsyncStorage.getItem("email");
          if (storedEmail) {
            setEmail(storedEmail);
          }
        } catch (error) {
          console.error("Error loading stored credentials:", error);
        }
      };

      loadStoredCredentials();
    }, [])
  );

  const handleLogin = async () => {
    setLoading(true); // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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
          await auth.signOut();
          await AsyncStorage.clear(); // Clear stored credentials
          return;
        }

        // Store the email in AsyncStorage for persistent login
        await AsyncStorage.setItem("email", email);
        setPassword(""); // Clear the password state after successful login

        console.log("User signed in successfully!");
        navigation.navigate("AuthenticatedScreen"); // Navigate to the authenticated screen
      } else {
        throw new Error("User data not found in Firestore");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
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

          <Text style={styles.desc2}>{t('loginPage.emailLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('loginPage.emailLabel')}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.desc2}>{t('loginPage.passwordLabel')}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('loginPage.passwordLabel')}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.iconContainer}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#3498db"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? t('loginPage.loading') : t('loginPage.loginButton')}
            </Text>
          </TouchableOpacity>
          <Text style={styles.forgotPasswordText} onPress={handleForgotPassword}>
            {t('loginPage.forgotPassword')}
          </Text>
          <Text style={styles.toggleText} onPress={handleSignUp}>
            {t('loginPage.signUpText')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  forgotPasswordText: {
    color: "#fff", // Change color to white
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 13, // Increase font size for better visibility
    fontWeight: "bold", // Make text bold
  },
  toggleText: {
    color: "#fff", // Change color to white
    textAlign: "center",
    marginTop: 4,
    fontSize: 13, // Increase font size for better visibility
    fontWeight: "bold", // Make text bold
  },
  button: {
    backgroundColor: '#FF5757', // Change background color to #FF5757
    paddingVertical: 10, // Vertical padding for button height
    width: "80%", // Match the width with the input fields
    borderRadius: 8, // Slightly smaller border radius
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // Reduce elevation for a smaller button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16, // Slightly smaller font size for the button text
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login; // Only one default export
