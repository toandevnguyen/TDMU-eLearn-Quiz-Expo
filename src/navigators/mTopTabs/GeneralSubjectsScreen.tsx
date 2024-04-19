/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Container } from "../../components";
import { colors } from "../../constants/colors";

export default function GeneralSubjectsScreen({ navigation }) {
  // const navigation = useNavigation();

  // const handleButtonPress = () => {
  //   // Chuyển đến màn hình mới và ẩn thanh tab bar
  //   navigation.navigate("ScreenName", { hideTabBar: true });
  // };

  return (
    <Container isScroll>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate(
              "PlaygroundScreen",
              { category: "Triết học" }
              // { title: "Triết học" },
            )
          }
        >
          <Text style={styles.categoryTitle}>Triết học</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Kinh tế chính trị</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Pháp luật</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Đông Nam bộ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>{"Tư Tưởng\nHồ Chí Minh"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Lịch sử Đảng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>{"Vật lý\nĐại cương"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() =>
            navigation.navigate("PlaygroundScreen", { category: "Triết học" })
          }
        >
          <Text style={styles.categoryTitle}>Chủ nghĩa XH-KH</Text>
        </TouchableOpacity>
      </View>
    </Container>
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
    // marginTop: 50,
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
});
