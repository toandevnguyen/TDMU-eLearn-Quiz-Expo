/* eslint-disable no-lone-blocks */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert, ImageBackground, StyleSheet, Text } from "react-native";

// import { useDispatch } from "react-redux";

import { useDispatch, useSelector } from "react-redux";

import {
  // ButtonComponent,
  Container,
} from "../components";
import { fireStore } from "../firebase/firebaseConfig";
import {
  logout,
  // selectIsLoggedIn,
  // selectIsLoggedIn,
  selectUser,
  setUser,
} from "../redux/slices/authSlice";
// import { globalStyles } from "../../styles/globalStyles";

export default function LoginScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "727064933607-sibinqt89eh0g7glqrau2jo42jc8dmpe.apps.googleusercontent.com",
    });
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user: {
    email: any;
    displayName: any;
    photoURL: any;
  }) {
    if (user) {
      dispatch(
        setUser({
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      // dispatch(setUser(null));
      dispatch(logout());
    }
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
      const user_signIn = await auth().signInWithCredential(googleCredential);
      const userEmail = user_signIn.user.email;
      if (
        userEmail.endsWith("@student.tdmu.edu.vn") ||
        userEmail.endsWith("@tdmu.edu.vn")
      ) {
        // Save user data to Firestore
        // const db = fireStore;
        const userRef = fireStore
          .collection("Users")
          .doc(user_signIn.user.email);
        await userRef.set({
          displayName: user_signIn.user.displayName,
          email: user_signIn.user.email,
          photoURL: user_signIn.user.photoURL,
        });
        // Email is valid, proceed to the app
        console.log("Login successful!");
        console.log(userEmail);
        // Dispatch action to set user in Redux store
        dispatch(
          setUser({
            email: user_signIn.user.email,
            displayName: user_signIn.user.displayName,
            photoURL: user_signIn.user.photoURL,
          })
        );
        // toHome();
      } else {
        // Email is not valid, show an alert and sign out
        Alert.alert(
          "Đăng nhập không thành công",
          "Bạn cần sử dụng email của TDMU để đăng nhập."
        );
        handleLogout();
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Đăng nhập lỗi",
        "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại."
      );
    }
  };

  if (initializing) return null;

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const toHome = () => {
    navigation.navigate("MBottomTabsNavigator");
  };
  return (
    <Container>
      <ImageBackground
        source={require("../assets/images/LoginScreenBkg.gif")}
        resizeMode="cover"
        style={styles.imgBkg}
      >
        <Text>{JSON.stringify(error)}</Text>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          style={styles.btn}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
        {/* )} */}
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

// Hàm này chuyển đổi đối tượng Firebase User thành một đối tượng dữ liệu serializable
// const serializeUser = (user_signIn) => ({
//   displayName: user_signIn.user.displayName,
//   email: user_signIn.user.email,
//   photoURL: user_signIn.user.photoURL,
//   // Các trường thông tin khác cần thiết
// });

// Sử dụng hàm này trước khi dispatch action
// dispatch(setUser(serializeUser(user_signIn)));

{
  /* <Text>{JSON.stringify(user?.displayName)}</Text> */
}
{
  /* {isLoggedIn ? (
          <>
            <Text style={{ marginTop: 100, textAlign: "center" }}>
              {"Xin chào,\n"}
              {user?.displayName}
            </Text>
            <Image
              source={{ uri: user?.photoURL }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                marginTop: 20,
              }}
            />
            <View style={{ marginTop: 80 }}>
              <Button title="Bắt đầu" onPress={toHome} />
              <SpaceComponent width={100} height={10} />
              <Button title="Đăng xuất" onPress={handleLogout} />
            </View>
          </>
        ) : ( */
}
