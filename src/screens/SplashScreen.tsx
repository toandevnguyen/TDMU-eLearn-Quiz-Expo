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
      <ImageBackground
        source={require("../assets/images/SplashScreenBkg.gif")}
        resizeMode="cover"
        style={styles.image}
      >
        <ActivityIndicator />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
