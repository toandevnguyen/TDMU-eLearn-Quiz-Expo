import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginScreen } from "../screens";
import MBottomTabNavigator from "./mBottomTabs/MBottomTabNavigator";
import { StatusBar } from "expo-status-bar";

export default function Route() {
  const NativeStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* <StatusBar hidden /> */}
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <NativeStack.Screen name="LoginScreen" component={LoginScreen} />
        <NativeStack.Screen
          name="MBottomTabNavigator"
          component={MBottomTabNavigator}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
