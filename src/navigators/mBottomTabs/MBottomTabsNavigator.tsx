import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  CalendarScreen,
  DocumentsScreen,
  MTopChatTabsNavigator,
  MTopHomeTabsNavigator,
  SettingScreen,
} from ".";
import { colors } from "../../constants/colors";

const Tab = createMaterialBottomTabNavigator();

export default function MBottomTabsNavigator() {
  return (
    <>
      {/* // <GestureHandlerRootView style={{ flex: 1, paddingTop: 30 }}> */}
      {/* <StatusBar /> */}
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={colors.darkBlue}
        // barStyle={{ backgroundColor: "rgb(6, 175, 248)" }}
      >
        <Tab.Screen
          name="Home"
          component={MTopHomeTabsNavigator}
          options={{
            tabBarLabel: "Ôn tập",

            tabBarIcon: ({ color }) => (
              <MaterialIcons name="quiz" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{
            tabBarLabel: "Lịch",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-month"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="MTopChatTabsNavigator"
          component={MTopChatTabsNavigator}
          options={{
            tabBarLabel: "ChatBot",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="wechat" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="DocumentScreen"
          component={DocumentsScreen}
          options={{
            tabBarLabel: "Tài liệu",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="file-document-multiple"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{
            tabBarLabel: "Cài đặt",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="saw-blade"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {/* </GestureHandlerRootView> */}
    </>
  );
}
