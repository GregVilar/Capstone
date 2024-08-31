import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Help from './Help';
import FAQ from './HELP/FAQ';
import AddInfo from './HELP/AddInfo';
import AddInfo2  from './HELP/AddInfo2';
import Hotline from './HELP/Hotline';
import LARG from './HELP/LARG';
import LARG2 from './HELP/LARG2';
import LARG3 from './HELP/LARG3';

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
      <Stack.Screen name="AddInfo" component={AddInfo} />
      <Stack.Screen name="AddInfo2" component={AddInfo2} />
      <Stack.Screen name="Hotline" component={Hotline} />
      <Stack.Screen name="LARG" component={LARG} />
      <Stack.Screen name="LARG2" component={LARG2} />
      <Stack.Screen name="LARG3" component={LARG3} />
    </Stack.Navigator>
  );
};

export default HelpStack;
