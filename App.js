import React from "react";
import { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from 'expo-location';
import MainNavigator from "./App/MainNavigator"; // Import MainNavigator
import { UserLocationContext } from "./App/Maps/UserLocationContext";



export default function App() {
  
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
          
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally show a loading screen here
  }

  return (
    <UserLocationContext.Provider 
    value={{location,setLocation}}>
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
    </UserLocationContext.Provider>
  );
}
