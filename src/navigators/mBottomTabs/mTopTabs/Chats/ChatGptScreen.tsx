/* eslint-disable prettier/prettier */
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SIZES, colors } from "../../../../constants/indexConstants";
import { useTheme } from "../../../../themes/themeProvider";

const ChatGptScreen = ({ navigation }) => {
  const API_KEY = "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";
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState(
    "Results should be shown here."
  );
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([]);
  const { colors } = useTheme();

  const renderMessage = (props) => {
    const { currentMessage } = props;

    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: COLORS.logoGPT,
                marginRight: 5,
                marginVertical: 10,
              },
            }}
            textStyle={{
              right: {
                color: COLORS.white,
                fontSize: 18,
                padding: 5,
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Image
            source={{
              uri: "https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-green-background-png.png",
            }}
            style={styles.avtChatGPT}
          />
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.black,
                marginLeft: 5,
                // marginVertical: 10,
              },
            }}
            textStyle={{
              left: {
                color: COLORS.white,
                fontSize: 18,
              },
            }}
          />
        </View>
      );
    }
  };

  // Implementing chat generation using gpt-3.5-turbo model
  const generateText = () => {
    setIsTyping(true);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createAt: new Date(),
      user: { _id: 1 },
      name: "ChatGPT-3.5",
    };

    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, [message])
    );

    /**
     * Always put your api key in an environment file
     */

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: inputMessage,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setInputMessage("");
        setOutputMessage(data.choices[0].message.content.trim());

        const message = {
          _id: Math.random().toString(36).substring(7),
          text: data.choices[0].message.content.trim(),
          createAt: new Date(),
          user: { _id: 2, name: "ChatGPT" },
        };

        setIsTyping(false);
        setMessages((previousMessage) =>
          GiftedChat.append(previousMessage, [message])
        );
      });
  };

  const submitHandler = () => {
    if (inputMessage.toLowerCase().startsWith("generate image")) {
      // generateImages();
    } else {
      generateText();
    }
  };

  const handleInputText = (text) => {
    setInputMessage(text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8", padding: 5 }}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: 1 }}
          minInputToolbarHeight={0}
          renderMessage={renderMessage}
          isTyping={isTyping}
        />
      </View>

      <View style={styles.containerInput}>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            value={inputMessage}
            onChangeText={handleInputText}
            placeholder="Nhập câu hỏi của bạn vào đây..."
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity onPress={submitHandler} style={styles.btn}>
            <FontAwesome name="send" color={COLORS.logoGPT} size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerInput: {
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
    // borderRadius: 8,
    marginHorizontal: 5,
  },
  txtSend: {
    color: "#fff",
    textAlign: "center",
  },

  avtChatGPT: {
    alignSelf: "flex-end",
    height: 30,
    width: 30,
    borderRadius: 20,
    marginLeft: 4,
  },
});

export default ChatGptScreen;

/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(232, 35, 35)",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity> */

/* <TouchableOpacity onPress={() => console.log("Save chat")}>
          <Ionicons name="bookmark-outline" size={24} color={colors.text} />
        </TouchableOpacity> */

// txtHeader: {
//   color: "#000000",
//   height: 30,
//   width: "auto",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: 24,
//   fontWeight: "bold",
//   textAlign: "center",
// },
// header: {
//   height: 80,
//   backgroundColor: colors.white,
//   position: "absolute",
//   top: 0,
//   right: 0,
//   alignItems: "center",
//   justifyContent: "space-between",
//   flexDirection: "row",
//   paddingHorizontal: 22,
//   width: SIZES.width,
//   zIndex: 9999,
// },

// // implementing images generations
// const generateImages = () => {
//   setIsTyping(true);
//   const message = {
//     _id: Math.random().toString(36).substring(7),
//     text: inputMessage,
//     createdAt: new Date(),
//     user: { _id: 1 },
//   };

//   setMessages((previousMessage) =>
//     GiftedChat.append(previousMessage, [message])
//   );

//   fetch("https://api.openai.com/v1/images/generations", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer your_own_openai_api_key",
//     },
//     body: JSON.stringify({
//       prompt: inputMessage,
//       n: 1,
//       size: "1024x1024",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.data[0].url);
//       setInputMessage("");
//       setOutputMessage(data.data[0].url);
//       setIsTyping(false);

//       data.data.forEach((item) => {
//         const message = {
//           _id: Math.random().toString(36).substring(7),
//           text: "Image",
//           createdAt: new Date(),
//           user: { _id: 2, name: "ChatGPT" },
//           image: item.url,
//         };

//         setMessages((previousMessage) =>
//           GiftedChat.append(previousMessage, [message])
//         );
//       });
//     });
// };
