import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React, { useState, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import {
  // ButtonComponent,
  Container,
  // Section,
  TextComponent,
} from "../../components";
import { colors } from "../../constants/colors";
import { fontFamilies } from "../../constants/fontFamilies";
// import { globalStyles } from "../../styles/globalStyles";

export default function LoginScreen() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "727064933607-sibinqt89eh0g7glqrau2jo42jc8dmpe.apps.googleusercontent.com",
  });
  // Handle user state changes
  function onAuthStateChanged() {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_signIn = auth().signInWithCredential(googleCredential);
    user_signIn
      .then((user) => {
        console.log(user);
        // return auth().signInWithCredential(googleCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (initializing) return null;

  if (!user) {
    return (
      <Container>
        <Image
          source={require("../../assets/images/LoginScreenImg.png")}
          resizeMode="cover"
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
          <GoogleSigninButton onPress={onGoogleButtonPress} />
          {/* <ButtonComponent
          icon={<FontAwesome5 name="google" color={colors.white} size={24} />}
          onPress={() => {
            console.log("press");
          }}
          styles={{
            flexDirection: "row",
            marginBottom: 230,
            paddingHorizontal: 20,
          }}
          text="   Đăng nhập bằng Google"
        /> */}
        </View>
      </Container>
    );
  }

  return (
    <View>
      <Text>Welcome {user}</Text>
    </View>
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
