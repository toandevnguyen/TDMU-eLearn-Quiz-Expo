import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

import GeneralSubjectsScreen from "./GeneralSubjectsScreen";
import PlaygroundScreen from "./PlaygroundScreen";

export default function GeneralSubjectsNavigator({ route }) {
  const NativeStack = createNativeStackNavigator();
  // const { title } = route.params;

  return (
    <NativeStack.Navigator
      initialRouteName="GeneralSubjectsScreen"
      screenOptions={{
        headerShown: true,
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <NativeStack.Screen
        options={{ headerShown: false }}
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
  );
}
