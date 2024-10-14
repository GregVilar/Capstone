import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import MainNavigator from "./App/MainNavigator"; // Ensure the path is correct
import { UserLocationContext } from "./App/Maps/UserLocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getAuth } from "firebase/auth"; // Ensure this import is correct

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // State to manage auth
  const auth = getAuth(); // Initialize Firebase Auth

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        // If user is not logged in, check if there is a token
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoggedIn === null) {
    return null; // Optionally show a loading screen here
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <NavigationContainer>
        {isLoggedIn ? (
          <MainNavigator /> // Render authenticated screens
        ) : (
          <MainNavigator /> // Render the main navigator (Login, SignUp, etc.)
        )}
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
}