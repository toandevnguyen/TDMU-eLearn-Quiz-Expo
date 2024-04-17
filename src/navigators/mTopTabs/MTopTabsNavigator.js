import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import GeneralSubjectsNavigator from "./GeneralSubjectsNavigator";
import ItSubjectsNavigator from "./ItSubjectsNavigator";

const MTopTab = createMaterialTopTabNavigator();
export default function MTopTabsNavigator() {
  return (
    <MTopTab.Navigator>
      <MTopTab.Screen
        options={{ title: "Các môn đại cương" }}
        name="GeneralSubjectsNavigator"
        component={GeneralSubjectsNavigator}
      />
      <MTopTab.Screen
        options={{ title: "Các môn công nghệ" }}
        name="ItSubjectsNavigator"
        component={ItSubjectsNavigator}
      />
    </MTopTab.Navigator>
  );
}

const styles = StyleSheet.create({});
