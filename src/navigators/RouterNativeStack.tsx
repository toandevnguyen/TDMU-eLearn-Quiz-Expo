import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, Button } from "react-native";

import { GeneralSubjectsScreen, PlaygroundScreen } from "./mBottomTabs";
import MBottomTabsNavigator from "./mBottomTabs/MBottomTabsNavigator";
import { LoginScreen } from "../screens";

export default function RouterNativeStack() {
  const NativeStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/* <StatusBar /> */}
      <NativeStack.Navigator
        screenOptions={
          {
            // headerShown: false,
          }
        }
      >
        <NativeStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <NativeStack.Screen
          name="MBottomTabsNavigator"
          component={MBottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <NativeStack.Screen
          name="GeneralSubjectsScreen"
          component={GeneralSubjectsScreen}
        />

        <NativeStack.Screen
          name="PlaygroundScreen"
          component={PlaygroundScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Triết học",
            headerShown: false,
            // Add a placeholder button without the `onPress` to avoid flicker
            // headerRight: () => <Button title="ĐÁP ÁN" />,
          })}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
