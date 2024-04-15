import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import {
  ButtonComponent,
  Container,
  // Section,
  TextComponent,
} from "../../components";
import { colors } from "../../constants/colors";
import { fontFamilies } from "../../constants/fontFamilies";
import { globalStyles } from "../../styles/globalStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  return (
    <Container>
      <Image
        source={require("../../assets/images/LoginScreenImg.png")}
        resizeMode="contain"
        style={{ width: "100%", height: 220 }}
      />
      <View style={styles.container}>
        <TextComponent
          text={"Welcome to\nTDMU-eLearn-Quiz "}
          type="title"
          color="black"
          font={fontFamilies.bold}
          size={30}
          styles={{
            textAlign: "center",
            marginVertical: 80,
          }}
        />
        <TextComponent
          text="Đăng nhập/Đăng ký!"
          type="description"
          color="black"
          font={fontFamilies.bold}
          size={20}
          styles={{
            textAlign: "center",
            marginVertical: 20,
          }}
        />
        <ButtonComponent
          icon={<FontAwesome5 name="google" color={colors.white} size={24} />}
          onPress={() => {
            console.log("press");
          }}
          styles={{
            flexDirection: "row",
            marginBottom: 230,
            paddingHorizontal: 20,
          }}
          text="   Đăng nhập bằng Google "
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: 590,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
