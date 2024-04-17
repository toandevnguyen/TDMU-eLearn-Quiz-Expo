import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  ImageBackground,
  // StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Avatar,
  // ButtonComponent,
  Container,
  SpaceComponent,
  // Section,
  TextComponent,
} from "../../components";
import { colors } from "../../constants/colors";
import { fontFamilies } from "../../constants/fontFamilies";
import { useNavigation } from "@react-navigation/native";
// import { globalStyles } from "../../styles/globalStyles";

export default function LoginScreen() {
  // Set an initializing state whilst Firebase connects
  const navigation = useNavigation();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "727064933607-sibinqt89eh0g7glqrau2jo42jc8dmpe.apps.googleusercontent.com",
    });
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_signIn = auth().signInWithCredential(googleCredential);
      user_signIn
        .then((user) => {
          console.log(user);
          // setUser(user);
          // setError("user sign-in failed");
          // return auth().signInWithCredential(googleCredential);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return null;

  const logout = async () => {
    try {
      setUser(null);
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const toHome = () => {
    navigation.navigate("MBottomTabNavigator");
  };
  return (
    <Container>
      <ImageBackground
        source={require("../../assets/images/LoginScreenBkg.gif")}
        resizeMode="cover"
        style={styles.imgBkg}
      >
        <Text>{JSON.stringify(error)}</Text>
        {/* <Text>{JSON.stringify(user?.displayName)}</Text> */}
        {user ? (
          <>
            <Text style={{ marginTop: 60 }}>Xin chào, {user?.displayName}</Text>
            {/* <Image
              source={{ uri: user?.photoURL }}
              style={{ width: 100, height: 100 }}
            /> */}
            <View style={{ marginTop: 60 }}>
              <Button title="Bắt đầu" onPress={toHome} />
              <SpaceComponent width={100} height={10} />
              <Button title="Đăng xuất" onPress={logout} />
            </View>
          </>
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            style={styles.btn}
            color={GoogleSigninButton.Color.Dark}
            onPress={onGoogleButtonPress}
          />
        )}
        <StatusBar style="auto" />
      </ImageBackground>
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
  imgBkg: {
    width: "100%",
    height: 800,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 150,
    alignSelf: "center",
    width: 180,
    height: 55,
    // color: "GoogleSigninButton.Color.Dark",
  },
});
