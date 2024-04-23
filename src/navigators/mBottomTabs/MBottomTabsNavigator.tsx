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

const Tab = createMaterialBottomTabNavigator();

export default function MBottomTabsNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 30 }}>
      <StatusBar />
      {/* <NavigationContainer> */}
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#06aff8"
        // barStyle={{ backgroundColor: "rgb(6, 175, 248)" }}
      >
        <Tab.Screen
          name="Home"
          component={MTopHomeTabsNavigator}
          options={{
            tabBarLabel: "Home",

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
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
      {/* </NavigationContainer> */}
    </GestureHandlerRootView>
  );
}
