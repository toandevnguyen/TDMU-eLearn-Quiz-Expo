import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Image
        source={require("../assets/images/SplashScreenBkg.gif")}
        resizeMode="contain"
        style={styles.image}
      />

      <ActivityIndicator />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
