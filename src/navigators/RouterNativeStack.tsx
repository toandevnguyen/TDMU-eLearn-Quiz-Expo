/* eslint-disable prettier/prettier */
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import { GeneralSubjectsScreen, PlaygroundScreen } from "./mBottomTabs";
import MBottomTabsNavigator from "./mBottomTabs/MBottomTabsNavigator";
import DocsScreen from "./mBottomTabs/documents/DocsScreen";
import IndexDocsScreen from "./mBottomTabs/documents/IndexDocsScreen";
import LecturersScreen from "./mBottomTabs/documents/LecturersScreen";
import {
  logout,
  selectIsLoggedIn,
  selectUser,
  setUser,
} from "../redux/slices/authSlice";
import { LoginScreen } from "../screens";

export default function RouterNativeStack() {
  const NativeStack = createNativeStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  const MainNativeStack = (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 30 }}>
      <NavigationContainer>
        {/* <StatusBar /> */}
        <NativeStack.Navigator
          // initialRouteName="MBottomTabsNavigator"
          screenOptions={
            {
              // headerShown: false,
            }
          }
        >
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
              headerTitle: "Triết học",
              headerShown: false,
              // Add a placeholder button without the `onPress` to avoid flicker
              // headerRight: () => <Button title="ĐÁP ÁN" />,
            }}
          />

          <NativeStack.Screen
            name="IndexDocsScreen"
            component={IndexDocsScreen}
            options={{ headerShown: false }}
          />
          <NativeStack.Screen
            name="LecturersScreen"
            component={LecturersScreen}
            options={{ headerShown: false }}
          />
          <NativeStack.Screen
            name="DocsScreen"
            component={DocsScreen}
            options={{ headerShown: false }}
          />
        </NativeStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
  const AuthNativeStack = (
    <NavigationContainer>
      {/* <StatusBar /> */}
      <NativeStack.Navigator
        // initialRouteName="MBottomTabsNavigator"
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
      </NativeStack.Navigator>
    </NavigationContainer>
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "727064933607-sibinqt89eh0g7glqrau2jo42jc8dmpe.apps.googleusercontent.com",
    });
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: {
    email: any;
    displayName: any;
    photoURL: any;
  }) {
    if (user) {
      dispatch(
        setUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      // dispatch(setUser(null));
      dispatch(logout());
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return isLoggedIn && user ? MainNativeStack : AuthNativeStack;
}
