import React, { useState, useEffect, useCallback } from "react";
import { Button, View, Alert, Dimensions, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import Pdf from "react-native-pdf";
import YoutubePlayer from "react-native-youtube-iframe";

import { colors } from "../../../constants/colors";
import { firebase } from "../../../firebase/firebaseConfig";

interface DocumentData {
  lectureVideoID?: string;
  uriPDF?: string;
  [key: string]: any; // cho phép có thêm các thuộc tính khác nếu cần
}

// Sử dụng khi khởi tạo state
export default function DocsScreen({ navigation: { goBack }, route }) {
  const { lecturer } = route.params;
  const [playing, setPlaying] = useState(false);
  const [documentData, setDocumentData] = useState<DocumentData>({});

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db
        .collection("Documents")
        .where("lecturer", "==", lecturer)
        .get();
      setDocumentData(data.docs[0].data()); // assuming there is at least one document
    };

    fetchData();
  }, [lecturer]);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const PdfResource = {
    uri: documentData.uriPDF,
    cache: true,
  };

  return (
    <>
      <Appbar.Header
        style={{ width: "100%", backgroundColor: colors.darkBlue }}
      >
        <Appbar.BackAction color="white" onPress={() => goBack()} />
        <Appbar.Content
          titleStyle={{ fontSize: 20 }}
          color="white"
          title={`Bài giảng của ${lecturer}`}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <YoutubePlayer
          height={200}
          play={playing}
          videoId={documentData.lectureVideoID}
          onChangeState={onStateChange}
        />
        <Pdf
          trustAllCerts={false}
          source={PdfResource}
          style={styles.pdf}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
        />
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
  pdf: {
    marginVertical: 10,
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

/* <Appbar.Content
  // style={styles.appBarContent}
  title={
    <Text style={styles.resultText}>
      {onPressHandleSubmit
        ? ` Đã làm:\n${completedQuestions}/${searchResults.length} câu`
        : `  Điểm:\n ${score}/${searchResults.length} đ`}
    </Text>
  }
/> */
// const togglePlaying = useCallback(() => {
//   setPlaying((prev) => !prev);
// }, []);

// /* eslint-disable prettier/prettier */
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// import { Container } from "../../components";
// import { colors } from "../../constants/colors";

// export default function DocumentsScreen({ navigation }) {
//   // const navigation = useNavigation();

//   // const handleButtonPress = () => {
//   //   // Chuyển đến màn hình mới và ẩn thanh tab bar
//   //   navigation.navigate("ScreenName", { hideTabBar: true });
//   // };

//   return (
//     <Container isScroll>
//       <View style={styles.categoryContainer}>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate(
//               "PlaygroundScreen",
//               { category: "Triết học" }
//               // { title: "Triết học" },
//             )
//           }
//         >
//           <Text style={styles.categoryTitle}>Triết học</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>Kinh tế chính trị</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>Pháp luật</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>Đông Nam bộ</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>{"Tư Tưởng\nHồ Chí Minh"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>Lịch sử Đảng</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>{"Vật lý\nĐại cương"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.category}
//           onPress={() =>
//             navigation.navigate("PlaygroundScreen", { category: "Triết học" })
//           }
//         >
//           <Text style={styles.categoryTitle}>Chủ nghĩa XH-KH</Text>
//         </TouchableOpacity>
//       </View>
//     </Container>
//   );
// }
