/* eslint-disable prettier/prettier */
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Button, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";

import { SpaceComponent } from "../../../../components";
import { colors } from "../../../../constants/colors";
import { COLORS } from "../../../../constants/theme";
import { firebase } from "../../../../firebase/firebaseConfig";

export default function PlaygroundScreen({ navigation: { goBack }, route }) {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [searchTxtInput, setSearchTxtInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState({});
  const [onPressHandleSubmit, setOnPressHandleSubmit] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { category } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let interval;
    if (isTimerActive && !isPaused) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isPaused]);
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = Math.floor(timeElapsed % 60);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleShowCorrectAnswer = (index) => {
    setShowCorrectAnswer({
      ...showCorrectAnswer,
      [index]: !showCorrectAnswer[index],
    });
  };

  const getQuestions = async () => {
    setSelectedOptions({});
    setShowResults(false);
    const db = firebase.firestore();
    const questionsRef = db.collection("questions");
    const snapshot = await questionsRef.where("category", "==", category).get();
    if (snapshot.empty) {
      console.log("No matching questions...");
      return;
    }
    const allQuestions = snapshot.docs.map((doc, index) => ({
      ...doc.data(),
      index,
    }));
    setQuestions(allQuestions);
    setSearchResults(allQuestions);
    setSearchTxtInput("");
    setOnPressHandleSubmit(true);
    setCompletedQuestions(0); // Reset completedQuestions
    setShowCorrectAnswer({}); // Reset showCorrectAnswer

    setIsTimerActive(false);
    setIsPaused(false);
    setTimeElapsed(0);
    setIsLoading(false);
  };

  const handleOptionSelect = (questionIndex, option) => {
    const isQuestionCompleted = selectedOptions[questionIndex] !== undefined;
    setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
    if (!isQuestionCompleted) {
      setCompletedQuestions(completedQuestions + 1);
    }
    setShowCorrectAnswer({ ...showCorrectAnswer, [questionIndex]: false });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    searchResults.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOption) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
    setOnPressHandleSubmit(false);

    setIsPaused((prevState) => !prevState);

    // setIsTimerActive(false);
    // setIsPaused(false);
    // setTimeElapsed(0);
  };

  const handleInputText = (text) => {
    setSearchTxtInput(text);
  };

  const searchQuestions = (searchTxtInput) => {
    const results = questions.filter((question) =>
      question.question.toLowerCase().includes(searchTxtInput.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleClearSearch = (questionIndex) => {
    setSearchTxtInput("");
    setSearchResults(questions);
    setIsTimerActive(false);
    setIsPaused(false);
    setTimeElapsed(0);
    // setShowCorrectAnswer({ ...showCorrectAnswer, [questionIndex]: false });
  };

  // const handleSearch = () => {
  //   console.log("Searching...");
  //   searchQuestions();
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // show ActivityIndicator when data is loading
        ) : (
          <>
            <>
              <Appbar.Header
                style={{ width: "100%", backgroundColor: colors.darkBlue }}
              >
                <Appbar.BackAction color="white" onPress={() => goBack()} />
                <Appbar.Content color="white" title="Triết học" />
                <Appbar.Content
                  // style={styles.appBarContent}
                  title={
                    <Text style={styles.resultText}>
                      {onPressHandleSubmit
                        ? ` Đã làm:\n${completedQuestions}/${searchResults.length} câu`
                        : `  Điểm:\n ${score}/${searchResults.length} đ`}
                    </Text>
                  }
                />
              </Appbar.Header>
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                      {item.index + 1}. {item.question}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.option,
                        selectedOptions[index] === 1 && styles.selectedOptions,
                        showResults &&
                          item.correctOption === 1 &&
                          styles.correctOption,
                        showResults &&
                          selectedOptions[index] === 1 &&
                          selectedOptions[index] !== item.correctOption &&
                          styles.wrongOption,
                      ]}
                      onPress={() => handleOptionSelect(index, 1)}
                      disabled={showResults}
                    >
                      <Text>A. {item.option1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.option,
                        selectedOptions[index] === 2 && styles.selectedOptions,
                        showResults &&
                          item.correctOption === 2 &&
                          styles.correctOption,
                        showResults &&
                          selectedOptions[index] === 2 &&
                          selectedOptions[index] !== item.correctOption &&
                          styles.wrongOption,
                      ]}
                      onPress={() => handleOptionSelect(index, 2)}
                      disabled={showResults}
                    >
                      <Text>B. {item.option2}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.option,
                        selectedOptions[index] === 3 && styles.selectedOptions,
                        showResults &&
                          item.correctOption === 3 &&
                          styles.correctOption,
                        showResults &&
                          selectedOptions[index] === 3 &&
                          selectedOptions[index] !== item.correctOption &&
                          styles.wrongOption,
                      ]}
                      onPress={() => handleOptionSelect(index, 3)}
                      disabled={showResults}
                    >
                      <Text>C. {item.option3}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.option,
                        selectedOptions[index] === 4 && styles.selectedOptions,
                        showResults &&
                          item.correctOption === 4 &&
                          styles.correctOption,
                        showResults &&
                          selectedOptions[index] === 4 &&
                          selectedOptions[index] !== item.correctOption &&
                          styles.wrongOption,
                      ]}
                      onPress={() => handleOptionSelect(index, 4)}
                      disabled={showResults}
                    >
                      <Text>D. {item.option4}</Text>
                    </TouchableOpacity>
                    {showCorrectAnswer[index] && (
                      <View>
                        <Text style={[styles.option, styles.seeResults]}>
                          {item.correctOption === 1 && "A. " + item.option1}
                          {item.correctOption === 2 && "B. " + item.option2}
                          {item.correctOption === 3 && "C. " + item.option3}
                          {item.correctOption === 4 && "D. " + item.option4}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Button
                        onPress={() => handleShowCorrectAnswer(index)}
                        radius="sm"
                        type="clear"
                        iconRight
                        buttonStyle={{
                          width: 110,
                          height: 40,
                          // padding: 10,
                          alignSelf: "flex-start",
                        }}
                      >
                        {showCorrectAnswer[index] ? "Ẩn đáp án" : "Xem đáp án"}
                        <MaterialCommunityIcons
                          name={showCorrectAnswer[index] ? "eye-off" : "eye"}
                          color="rgb(6, 175, 248)"
                          size={24}
                        />
                      </Button>

                      <Button
                        radius="sm"
                        type="clear"
                        // iconRight
                        buttonStyle={{
                          width: 110,
                          height: 40,
                        }}
                      >
                        Thảo luận
                        <MaterialCommunityIcons
                          name="comment-eye-outline"
                          color="red"
                          size={24}
                        />
                      </Button>
                    </View>
                  </View>
                )}
              />
            </>
            <View style={styles.containerInput}>
              <View style={styles.txtInputContainer}>
                <TextInput
                  style={styles.txtInput}
                  value={searchTxtInput}
                  onChangeText={(searchTxtInput) => {
                    setSearchTxtInput(searchTxtInput);
                    searchQuestions(searchTxtInput);
                  }}
                  placeholder="Nhập câu hỏi bạn muốn tìm..."
                  placeholderTextColor="#aaa"
                />

                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.btn}
                >
                  <FontAwesome5
                    name="eraser"
                    color={COLORS.secondaryGray}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnBottom}>
              <TouchableOpacity
                style={styles.startBtn}
                onPress={() => {
                  if (isTimerActive) {
                    setIsPaused((prevState) => !prevState);
                  } else {
                    setIsTimerActive(true);
                    setIsPaused(false);
                    setTimeElapsed(0);
                  }
                }}
              >
                {isTimerActive ? (
                  isPaused ? (
                    <Ionicons
                      name="play"
                      size={24}
                      color="white"
                      style={{ marginTop: 2 }}
                    />
                  ) : (
                    <Ionicons
                      name="pause"
                      size={24}
                      color="white"
                      style={{ marginTop: 2 }}
                    />
                  )
                ) : (
                  <Ionicons
                    name="time"
                    size={24}
                    color="white"
                    style={{ marginTop: 2 }}
                  />
                )}

                <SpaceComponent width={5} />
                <Text style={styles.submitButtonText}>
                  {isTimerActive
                    ? isPaused
                      ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                      : `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                    : "Bắt đầu"}
                </Text>
              </TouchableOpacity>

              <SpaceComponent width={10} />

              <TouchableOpacity
                style={styles.stopAgainBtn}
                onPress={onPressHandleSubmit ? handleSubmit : getQuestions}
              >
                {onPressHandleSubmit ? (
                  <Ionicons
                    name="stop-circle"
                    size={24}
                    color="white"
                    style={{ marginTop: 2 }}
                  />
                ) : (
                  <Entypo
                    name="back-in-time"
                    size={24}
                    color="white"
                    style={{ marginTop: 2 }}
                  />
                )}

                <SpaceComponent width={5} />
                <Text style={styles.submitButtonText}>
                  {onPressHandleSubmit ? "Kết thúc" : "Làm lại"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appBarContent: {
    backgroundColor: "rgb(28, 239, 9)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    maxWidth: "20%",
    marginEnd: "5%",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  flatList: {
    flex: 1,
    alignSelf: "stretch",
    // backgroundColor: 'rgb(201, 237, 40)',
  },
  questionContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#eeee",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  selectedOptions: {
    backgroundColor: "#06aff8",
  },
  correctOption: {
    backgroundColor: "rgb(23, 211, 108)",
  },
  seeResults: {
    backgroundColor: "rgb(243, 163, 14)",
  },
  wrongOption: {
    backgroundColor: "rgb(255, 75, 3)",
  },
  submitButton: {
    backgroundColor: "#06aff8",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
  },
  btnBottom: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  result: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  resultText: {
    // width: "50%",
    alignSelf: "flex-end",
    maxWidth: "50%",
    color: "rgb(6, 175, 248)",
    padding: 5,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 10,
    backgroundColor: "rgb(255, 255, 255)",
    // backgroundColor: "rgb(6, 175, 248)",
  },
  startBtn: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  startTxt: {
    color: "#fff",
    fontSize: 20,
  },
  stopAgainBtn: {
    backgroundColor: colors.darkBlue,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  stopAgainTxt: {
    color: "#fff",
    fontSize: 20,
  },
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
    borderWidth: 1,
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

  errorMessBtn: {
    maxWidth: "20%",
    width: "20%",
  },
});

// {/* <Appbar.Content
//             style={styles.appBarContent}
//             title="Bắt đầu"
//             color="rgb(255, 255, 255)"
//             titleStyle={{ fontSize: 18 }}
//             // onPress={handleStart}
//           />
//           <Appbar.Content
//             style={styles.appBarContent}
//             title="Đáp án"
//             color="rgb(255, 255, 255)"
//             titleStyle={{ fontSize: 18 }}
//             onPress={handleSubmit}
//           /> */}
//           {/* <Appbar.Action icon="calendar" onPress={() => {}} />
//           <Appbar.Action icon="magnify" onPress={() => {}} /> */}
