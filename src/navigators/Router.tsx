import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";

import MBottomTabsNavigator from "./mBottomTabs/MBottomTabsNavigator";
import GeneralSubjectsScreen from "./mTopTabs/GeneralSubjectsScreen";
import PlaygroundScreen from "./mTopTabs/PlaygroundScreen";
import { LoginScreen } from "../screens";

export default function Route() {
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
          options={{
            title: "Triết học",
          }}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}
