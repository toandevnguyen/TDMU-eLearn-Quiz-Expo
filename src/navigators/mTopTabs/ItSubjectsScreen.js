import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ItSubjectsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate(
              "Playground",
              { category: "Triết học" },
              // { title: "Triết học" },
            )
          }
        >
          <Text style={styles.categoryTitle}>Triết học</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("Playground", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Kinh tế chính trị</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("Playground", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Pháp luật</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("Playground", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Đông Nam bộ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("Playground", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Kiến trúc máy tính</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("Playground", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Mạng máy tính</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(6, 225, 249)",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "rgb(255, 255, 255)",
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(255, 255, 255)",
  },
});
