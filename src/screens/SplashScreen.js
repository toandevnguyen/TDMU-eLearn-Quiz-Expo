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
      <Image
        source={require("../assets/SplashScreenImg.png")}
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
