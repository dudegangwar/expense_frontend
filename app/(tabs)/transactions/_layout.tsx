import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack 
        screenOptions={{
          headerShown: false, // You can control screen options here
        }}
      />
  );
}



const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});