import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../../constants/colors";
export default function ChatBubbleCpn({ role, text, onSpeech }) {
  return (
    <View
      style={[
        styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
      ]}
    >
      <Text style={styles.chatText}>{text}</Text>
      {role === "model" && (
        <>
          <>
            <Image
              source={require("../../../../assets/images/geminiLogo.jpg")}
              style={styles.avtChatGPT}
            />
          </>
          <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
            <Ionicons name="volume-high-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    position: "relative",
    backgroundColor: "rgb(211, 90, 90)",
  },

  userChatItem: {
    alignSelf: "flex-end",
    backgroundColor: colors.logoGemini,
  },

  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#000",
  },
  chatText: {
    fontSize: 16,
    color: "#fff",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  avtChatGPT: {
    // justifyContent: "center",
    // backgroundColor: "rgb(201, 23, 23)",
    alignSelf: "flex-start",
    height: 35,
    width: 35,
    borderRadius: 20,
    marginTop: 5,
    position: "relative",
  },
});
