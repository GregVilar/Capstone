import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainNavigator from "./App/MainNavigator"; // Import MainNavigator

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("./assets/fonts/Outfit-Regular.ttf"),
          
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally show a loading screen here
  }

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
