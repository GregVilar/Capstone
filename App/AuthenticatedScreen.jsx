import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from './FirebaseConfig'; // Adjust path if needed
import Home from './Home';
import Favorites from './Favorites';
import Forum from './Forum';
import Translate from './Translate';
import TTS from './TTS';
import HelpStack from "./HelpStack";

// Home Screen - LOGOUT FUNCTION WIP - ADD TO DRAWER MENU
// const HomeScreen = ({ navigation }) => {
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       console.log("User logged out successfully!");
//       navigation.navigate("Login"); // Navigate to Login screen after logout
//     } catch (error) {
//       console.error("Logout error:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome</Text>
//       <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
//     </View>
//   );
// };

// Settings Screen
const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-circle';
          } else if (route.name === 'Forum') {
            iconName = 'forum';
          } else if (route.name === 'Favorite') {
            iconName = 'heart';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5757', // Color for the active tab
        tabBarInactiveTintColor: 'gray', // Color for the inactive tabs
        tabBarStyle: { backgroundColor: '#185c6b' }, // Background color of the tab bar
        tabBarLabelStyle: { fontFamily: 'outfit-bold', fontSize: 11 } // Custom font for labels
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Forum" component={Forum} options={{ headerShown: false }} />
      <Tab.Screen name="Favorite" component={Favorites} options={{ headerShown: false }}  />
    </Tab.Navigator>
  );
}

export default function AuthenticatedScreen() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <MaterialCommunityIcons name="menu" size={24} color="white" style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#185c6b',
          },
          headerTintColor: '#fff',
        })}
      >
        <Drawer.Screen name="PWDaan" component={BottomTabs} />
        <Drawer.Screen name="TTS" component={TTS} />
        <Drawer.Screen name="Translate" component={Translate} />
        <Drawer.Screen name="Help" component={HelpStack} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Custom Drawer Content Component
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <DrawerItemList {...props} />
    </View>
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 16,
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  drawerTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
});
