import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";

import PlaygroundScreen from "./PlaygroundScreen";
import { fontFamilies } from "../../constants/fontFamilies";
import ItSubjectsScreen from "./ItSubjectsScreen";

export default function ItSubjectsNavigator({ route }) {
  const NativeStack = createNativeStackNavigator();
  // const { title } = route.params;

  return (
    <NativeStack.Navigator
      initialRouteName="ItSubjectsScreen"
      screenOptions={{
        headerShown: true,
        // headerTintColor: 'white',
        // headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <NativeStack.Screen
        options={{ headerShown: false }}
        name="ItSubjectsScreen"
        component={ItSubjectsScreen}
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

const styles = StyleSheet.create({});
