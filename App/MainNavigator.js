import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
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
      {user && (
        <Stack.Screen name="AuthenticatedScreen" component={AuthenticatedScreen} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
