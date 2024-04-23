/* eslint-disable prettier/prettier */
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ChatBubbleCpn from "./ChatBubbleCpn";
import { colors } from "../../../../constants/colors";
import { COLORS } from "../../../../constants/theme";

export default function GeminiChatBotScreen() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyBBpTcWRiGFg4h4kaQkruYVcTxGcvOtH68";
  const handleUserInput = async () => {
    //add user input to chatbot
    const updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini API response", response.data);
      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (modelResponse) {
        //add model response
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API: ", error);
      console.error("Error calling Gemini Pro API: ", error.response);
      setError("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };
  const handleSpeech = async (text) => {
    if (isSpeaking) {
      //If already speaking, stop speech
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };
  const renderChatItem = ({ item }) => (
    <ChatBubbleCpn
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Gemini Pro ChatBot</Text> */}
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            placeholder="Nhập câu hỏi của bạn vào đây..."
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity onPress={handleUserInput} style={styles.btn}>
            <FontAwesome name="send" color={COLORS.logoGemini} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <ActivityIndicator
          animating
          size="small"
          style={styles.loading}
          color="#03A9F1"
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f8f8f8",
  },

  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    // backgroundColor: colors.white,
    paddingVertical: 8,
  },
  txtInputContainer: {
    flex: 1,
    flexDirection: "row",
    // marginLeft: 10,
    backgroundColor: colors.white,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: colors.black,
    borderWidth: 0.2,
  },
  txtInput: {
    color: colors.black,
    flex: 1,
    paddingHorizontal: 10,
  },

  btn: {
    padding: 6,
    marginHorizontal: 5,
  },

  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
