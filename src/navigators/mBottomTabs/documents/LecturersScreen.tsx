/* eslint-disable prettier/prettier */
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";

import { Container } from "../../../components";
import { colors } from "../../../constants/colors";
import { firebase } from "../../../firebase/firebaseConfig";

export default function LecturersScreen({ navigation: { goBack }, route }) {
  const navigation = useNavigation();
  const { category } = route.params;
  const [lecturers, setLecturers] = useState([]); // State to store lecturers

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db
        .collection("Documents")
        .where("subject", "==", category)
        .get();
      setLecturers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <>
      <Appbar.Header
        style={{ width: "100%", backgroundColor: colors.darkBlue }}
      >
        <Appbar.BackAction color="white" onPress={() => goBack()} />
        <Appbar.Content color="white" title={`Các giảng viên dạy ${category}`} />
      </Appbar.Header>
      <View style={styles.categoryContainer}>
        {lecturers.map((lecturer) => (
          <TouchableOpacity
            key={lecturer.id}
            style={styles.category}
            onPress={() =>
              navigation.navigate("DocsScreen", { lecturer: lecturer.lecturer })
            }
          >
            <Text style={styles.categoryTitle}>{lecturer.lecturer}</Text>

            <View style={styles.favoriteContainer}>
              <Text style={styles.favoritesCount}>100</Text>
              <AntDesign
                name="heart"
                size={20}
                color="red"
                onPress={() => console.log("tym")}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(6, 225, 249)",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // marginTop: 50,
    flex: 1,
    backgroundColor: colors.white,
  },
  category: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "rgb(6, 175, 248)",
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
    borderRadius: 10,
  },
  categoryTitle: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    // fontWeight: "bold",
    textAlign: "center",
    color: "rgb(255, 255, 255)",
  },
  favoriteContainer: {
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 2,
    right: 2,
    // backgroundColor: "rgb(169, 211, 182)",
  },
  favoritesCount: {
    fontFamily: "Roboto_700Bold",
    fontSize: 10,
    color: colors.white,
  },
});
