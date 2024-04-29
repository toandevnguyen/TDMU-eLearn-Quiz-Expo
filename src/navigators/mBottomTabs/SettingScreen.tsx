import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  logout,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/slices/authSlice";

export default function SettingScreen({ navigation }) {
  const { email, displayName, photoURL } = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log("🚀 ~ SettingScreen ~ email:", email);
  console.log("🚀 ~ SettingScreen ~ photoURL:", photoURL);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log("🚀 ~ SettingScreen ~ isLoggedIn:", isLoggedIn);

  const gotoLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      // gotoLoginScreen();
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Email: {email}</Text>
      <Text>Name: {displayName}</Text>
      {/* <Image source={{ uri: photoURL }} /> */}
      <Image
        style={styles.tinyLogo}
        source={{
          uri: photoURL,
        }}
      />
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // position: "relative",
    alignItems: "center", // Đảm bảo phần tử con có thể sử dụng position: "absolute"
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
