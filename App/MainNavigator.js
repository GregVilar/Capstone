import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import OTPVerification from "./OTPVerification";
import AuthenticatedScreen from "./AuthenticatedScreen";
import HelpStack from "./HelpStack"; // Import HelpStack
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
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this stack
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      {user && (
        <>
          <Stack.Screen name="AuthenticatedScreen" component={AuthenticatedScreen} options={{ headerShown: false }} />
          {/* Add HelpStack after authentication */}
          <Stack.Screen name="Help" component={HelpStack} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;