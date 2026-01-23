/**
 * MainTabs - Bottom tab navigation after login
 * @format
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { useTheme } from '../context/ThemeContext';
import {
  Medicines,
} from 'healthicons-react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide headers for cleaner iOS look
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.separator,
          borderTopWidth: 0.5,
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.systemGray,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 4,
        },
      }
    }>
      <Tab.Screen 
        name="Medications" 
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Medicines width={size} height={size} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
