import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from './FirebaseConfig'; // Adjust path if needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import Favorites from './Favorites';
import ForumStack from './ForumStack';
import Translate from './Translate';
import TTS from './TTS';
import HelpStack from './HelpStack';
import Profile from './Profile';
import SettingsScreen from './SettingsScreen';
import { useTranslation } from 'react-i18next';

// Handle Logout
const handleLogout = async (navigation) => {
  try {
    await auth.signOut();
    await AsyncStorage.removeItem('userToken'); // Clear the user token
    console.log("User logged out successfully!");
    navigation.navigate("Login"); // Navigate to Login screen after logout
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Use static names for the route
          if (route.name === 'Home') {
            iconName = 'home-circle';
          } else if (route.name === 'Forum') {
            iconName = 'forum';
          } else if (route.name === 'Favorites') {
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
      {/* Static screen names */}
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false, title: t('authScreen.home') }} 
      />
      <Tab.Screen 
        name="Forum" 
        component={ForumStack} 
        options={{ headerShown: false, title: t('authScreen.forum') }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{ headerShown: false, title: t('authScreen.favorite') }} 
      />
    </Tab.Navigator>
  );
}

export default function AuthenticatedScreen() {
  const { t } = useTranslation();

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
      {/* Use static names for the screens */}
      <Drawer.Screen 
        name="HomeDrawer" 
        component={BottomTabs} 
        options={{ title: 'PWDaan' }} 
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: t('authScreen.profile') }} 
      />
      <Drawer.Screen 
        name="TTS" 
        component={TTS} 
        options={{ title: t('authScreen.tts') }} 
      />
      <Drawer.Screen 
        name="Translate" 
        component={Translate} 
        options={{ title: t('authScreen.translate') }} 
      />
      <Drawer.Screen 
        name="Help" 
        component={HelpStack} 
        options={{ title: t('authScreen.help') }} 
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: t('authScreen.settings') }} 
      />
    </Drawer.Navigator>
  );
}

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Text style={styles.drawerTitle}>{t('authScreen.menu')}</Text>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout(navigation)}>
          <Text style={styles.logoutText}>{t('authScreen.logout')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
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
