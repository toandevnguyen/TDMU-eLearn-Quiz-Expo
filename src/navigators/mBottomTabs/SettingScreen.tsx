import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
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
});
