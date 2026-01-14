/**
 * AppNavigator - Handles routing
 * @format
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './MainTabs';
import { useTheme } from '../context/ThemeContext';

export default function AppNavigator() {
  const { colors } = useTheme();
  const isLoading = false;

  const styles = createStyles(colors);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainTabs/>
    </NavigationContainer>
  );
}

const createStyles = (colors) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
