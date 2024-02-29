import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import DocumentsScreen from "./DocumentsScreen";
import MTopTabsNavigator from "../mTopTabs/MTopTabsNavigator";
import CalendarScreen from "./CalendarScreen";
import SearchScreen from "./SearchScreen";
import SettingScreen from "./SettingScreen";

const Tab = createMaterialBottomTabNavigator();

export default function MBottomTabNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="rgb(6, 175, 248)"
          // barStyle={{ backgroundColor: "rgb(6, 175, 248)" }}
        >
          <Tab.Screen
            name="Home"
            component={MTopTabsNavigator}
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
            name="SearchScreen"
            component={SearchScreen}
            options={{
              tabBarLabel: "Tìm",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="text-box-search"
                  color={color}
                  size={26}
                />
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
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
