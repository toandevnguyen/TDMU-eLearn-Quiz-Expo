import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import GeneralSubjectsScreen from "./GeneralSubjectsScreen";
import ItSubjectsScreen from "./ItSubjectsScreen";
import { colors } from "../../../../constants/indexConstants";

const MTopTab = createMaterialTopTabNavigator();
export default function MTopHomeTabsNavigator() {
  return (
    <MTopTab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: {
          fontSize: 14,
          // color: colors.darkBlue,

          fontWeight: "bold",
        },
        // tabBarItemStyle: { width: "100%" },
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
          title: "Các môn đại cương",
          // tabBarPressColor: colors.darkBlue,
          tabBarActiveTintColor: colors.darkBlue,
        }}
        name="GeneralSubjectsNavigator"
        component={GeneralSubjectsScreen}
      />
      <MTopTab.Screen
        options={{
          title: "Các môn công nghệ",
          // tabBarPressColor: colors.darkBlue,
          tabBarActiveTintColor: colors.darkBlue,
        }}
        name="ItSubjectsNavigator"
        component={ItSubjectsScreen}
      />
    </MTopTab.Navigator>
  );
}

const styles = StyleSheet.create({});
