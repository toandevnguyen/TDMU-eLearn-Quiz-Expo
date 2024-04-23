import { Image } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DateTimePickerComponent } from "../../components";

export default function DocumentsScreen() {
  return (
    <View style={styles.container}>
      <Text>DocumentScreen</Text>
      <DateTimePickerComponent />
      {/* <View style={styles.bottomRight}>
        <Image
          placeholderStyle={styles.bottomRight}
          source={require("../../assets/gif/plus-no-bkg.gif")}
          resizeMode="center"
          style={styles.item}
          // PlaceholderContent={<ActivityIndicator />}
        />
      </View> */}
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
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 100, // Kích thước cố định cho phần tử con
    height: 100,
  },
  item: {
    width: "100%",
    height: "100%",
  },
});
