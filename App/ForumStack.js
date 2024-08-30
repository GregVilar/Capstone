import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Forum from './Forum'; // Adjust the path as necessary
import DiscussionGeneral from './Discussions/DiscussionGeneral'; 
import DiscussionLandmarks from './Discussions/DiscussionLandmarks'; 
import DiscussionGeneral1 from './Discussions/DiscussionGeneral1'; 
import DiscussionLandmarks1 from './Discussions/DiscussionLandmarks1';

const Stack = createStackNavigator();

const ForumStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Forum">
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="DiscussionGeneral" component={DiscussionGeneral} />
        <Stack.Screen name="DiscussionLandmarks" component={DiscussionLandmarks} />
        <Stack.Screen name="DiscussionGeneral1" component={DiscussionGeneral1} />
        <Stack.Screen name="DiscussionLandmarks1" component={DiscussionLandmarks1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ForumStack;
