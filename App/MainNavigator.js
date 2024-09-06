import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import SignUp from "./SignUp";
import OTPVerification from "./OTPVerification";
import AuthenticatedScreen from "./AuthenticatedScreen";
import { auth } from "./FirebaseConfig"; // Adjust path if needed

const Stack = createStackNavigator();

function MainNavigator() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      {user && (
        <Stack.Screen name="AuthenticatedScreen" component={AuthenticatedScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
