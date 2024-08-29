import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Help from './Help';
import FAQ from './HELP/FAQ';

const Stack = createStackNavigator();

const HelpStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens in this stack
      }}
    >
      <Stack.Screen name="HelpScreen" component={Help} />
      <Stack.Screen name="FAQScreen" component={FAQ} />
    </Stack.Navigator>
  );
};

export default HelpStack;
