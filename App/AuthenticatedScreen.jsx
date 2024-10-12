import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from './FirebaseConfig'; // Adjust path if needed
import Home from './Home';
import Favorites from './Favorites';
import ForumStack from './ForumStack';
import Translate from './Translate';
import TTS from './TTS';
import HelpStack from "./HelpStack";
import Profile from './Profile';
import SettingsScreen from './SettingsScreen';

// Handle Logout
const handleLogout = async (navigation) => {
  try {
    await auth.signOut();
    console.log("User logged out successfully!");
    navigation.navigate("Login"); // Navigate to Login screen after logout
  } catch (error) {
    console.error("Logout error:", error.message);
  }
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
        tabBarActiveTintColor: '#FF5757',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#185c6b' },
        tabBarLabelStyle: { fontFamily: 'outfit-bold', fontSize: 11 }
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Forum" component={ForumStack} options={{ headerShown: false }} />
      <Tab.Screen name="Favorite" component={Favorites} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function AuthenticatedScreen() {
  return (
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
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="TTS" component={TTS} />
      <Drawer.Screen name="Translate" component={Translate} />
      <Drawer.Screen name="Help" component={HelpStack} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>Menu</Text>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout(navigation)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 16,
  },
  logoutButton: {
    padding: 16,
    backgroundColor: '#FF5757',
    alignItems: 'center',
    borderRadius: 8,
    margin: 16,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
