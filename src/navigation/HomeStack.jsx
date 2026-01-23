/**
 * HomeStack - Stack navigation for Home tab
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MedScreen from '../screens/MedScreen/MedScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: false,
      gestureEnabled: true,
      fullScreenGestureEnabled: true
    }}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="MedScreen" component={MedScreen} />
    </Stack.Navigator>
  );
}
