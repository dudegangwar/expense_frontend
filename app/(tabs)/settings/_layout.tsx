import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We'll handle the header in the screen or globally if needed
        contentStyle: { backgroundColor: '#151718' }, // Match dark theme default
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}