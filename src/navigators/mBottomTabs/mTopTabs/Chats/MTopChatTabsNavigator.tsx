import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import { colors } from "../../../../constants/indexConstants";
import ChatGptScreen from "./ChatGptScreen";
import GeminiScreen from "./GeminiScreen";
import { backgroundColor } from "../../../../styles/style";

const MTopTab = createMaterialTopTabNavigator();
export default function MTopChatTabsNavigator() {
  return (
    <MTopTab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: {
          fontSize: 14,
          // color: colors.darkBlue,

          fontWeight: "bold",
        },
        // tabBarItemStyle: { borderBlockStartColor: colors.logoGPT },
        tabBarStyle: {
          height: 70,
          // padding: 10,
          justifyContent: "center",
          backgroundColor: colors.white,
          // paddingTop: 10,
        },
      })}
    >
      <MTopTab.Screen
        options={{
          title: "ChatGPT",
          // tabBarPressColor: colors.logoGPT,

          tabBarActiveTintColor: colors.logoGPT,
        }}
        name="ChatGptScreen"
        component={ChatGptScreen}
      />
      <MTopTab.Screen
        options={{
          title: "Gemini",
          // tabBarPressColor: colors.darkBlue,
          // tabBarInactiveTintColor: colors.logoGPT,

          tabBarActiveTintColor: colors.logoGemini,
        }}
        name="GeminiScreen"
        component={GeminiScreen}
      />
    </MTopTab.Navigator>
  );
}

const styles = StyleSheet.create({});
