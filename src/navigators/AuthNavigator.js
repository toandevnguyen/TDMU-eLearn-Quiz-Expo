import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoginScreen } from "../screens";

export default function AuthNavigator() {
  const NativeStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <NativeStack.Screen name="LoginScreen" component={LoginScreen} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
