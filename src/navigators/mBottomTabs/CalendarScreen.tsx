/* eslint-disable prettier/prettier */
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
  LocaleConfig,
} from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { colors } from "../../constants/colors";
import { COLORS } from "../../constants/theme";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { fireStore } from "../../firebase/firebaseConfig";
import firebase from "firebase/compat";

// import testIDs from "../testIDs";

LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};

LocaleConfig.defaultLocale = ["vi"];

export default function CalendarScreen() {
  const today = new Date();
  const todayString = today.toLocaleDateString("en-CA"); // YYYY-MM-DD format
  // convert to 'YYYY-MM-DD' format
  const [items, setItems] = useState<AgendaSchedule>({
    [todayString]: [], // initialize with today's date
  });
  const [txtInputEventName, setTxtInputNewEventName] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string>(todayString);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector(selectUser);
  const [selectedTime, setSelectedTime] = useState<Date>();

  const userSchedulesRef = fireStore
    .collection("Users")
    .doc(email)
    .collection("schedules");

  // useEffect(() => {
  //   // console.log("Items have changed:", selectedDay, items);
  // }, [selectedDay, items]); // Re-render khi items thay đổi

  useEffect(() => {
    const unsubscribe = fireStore
      .collection("Users")
      .doc(email)
      .collection("schedules")
      .orderBy("startTime") // Sắp xếp theo thời gian bắt đầu
      .onSnapshot((querySnapshot) => {
        const eventsData: AgendaSchedule = {};

        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          const eventDate = eventData.startTime
            .toDate()
            .toLocaleDateString("en-CA");
          const eventTime = eventData.startTime.toDate().toLocaleTimeString();
          if (!eventsData[eventDate]) {
            eventsData[eventDate] = [];
          }

          eventsData[eventDate].push({
            name: eventData.title,
            height: 50,
            day: eventDate,
            time: eventTime,
            // Thêm thông tin khác của sự kiện nếu cần
          });
        });
        setIsLoading(false);
        setItems(eventsData);
      });

    return unsubscribe;
  }, [email]); // Chỉ cần re-render khi email thay đổi

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const addEvent = async () => {
    if (txtInputEventName) {
      try {
        const eventData = {
          title: txtInputEventName,
          description: "Mô tả sự kiện",
          startTime: firebase.firestore.Timestamp.fromDate(
            new Date(selectedTime)
          ),
          endTime: firebase.firestore.Timestamp.fromDate(new Date(selectedDay)),
          createdAt: firebase.firestore.Timestamp.now(),
          updatedAt: firebase.firestore.Timestamp.now(),
          notification: {
            title: "Nhắc nhở sự kiện",
            body: "Bạn có một sự kiện sắp diễn ra",
          },
        };

        const docRef = await userSchedulesRef.add(eventData);
        console.log("Event added with ID: ", docRef.id);
        // Cập nhật lại state items để hiển thị sự kiện mới trên lịch
        const newItems = { ...items };
        if (!newItems[selectedDay]) {
          newItems[selectedDay] = [];
        }
        newItems[selectedDay].push({
          name: txtInputEventName,
          height: 50,
          day: selectedDay,
        });
        setItems(newItems);
        setTxtInputNewEventName(""); // Clear input after adding
      } catch (error) {
        console.error("Error adding event: ", error);
      }
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // const dateString = date.toISOString().split("T")[0];
    // console.log("A date has been picked: ", dateString);
    // setSelectedDay(dateString);
    // hideDatePicker();
    const selectedDateString = date.toLocaleDateString("en-CA");
    setSelectedDay(selectedDateString);
    setSelectedTime(date);
    if (!items[selectedDateString]) {
      items[selectedDateString] = [];
    }

    setItems({ ...items });
    // setTxtInputNewEventName("");
    hideDatePicker();
  };

  const handleDayPress = (day: DateData) => {
    setSelectedDay(day.dateString);
    // Tải các sự kiện của ngày được chọn vào items
    if (!items[day.dateString]) {
      items[day.dateString] = [];
    }
    setItems({ ...items });
    console.log("A date has been picked: ", day.dateString);
    hideDatePicker();
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() =>
          Alert.alert(
            reservation.name,
            reservation.day + " " + reservation.time
          )
        }
      >
        <Text
          style={{
            fontSize: isFirst ? 16 : 14,
            color: isFirst ? "black" : "#43515c",
          }}
        >
          {reservation.name}
        </Text>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: isFirst ? 16 : 14,
              color: isFirst ? "black" : "#43515c",
            }}
          >
            Ngày: {new Date(reservation.day).toLocaleDateString("vi-VN")}
          </Text>
          <Text
            style={{
              fontSize: isFirst ? 16 : 14,
              color: isFirst ? "black" : "#43515c",
            }}
          >
            Thời gian: {reservation.time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.item}>
        <Text>Chưa có nhiệm vụ hay sự kiện trong ngày!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // show ActivityIndicator when data is loading
      ) : (
        <>
          <Agenda
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            items={items}
            // loadItemsForMonth={loadItems}
            selected={selectedDay}
            onDayPress={handleDayPress}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob
            pastScrollRange={6}
            futureScrollRange={6}
          />
          <View style={styles.inputContainer}>
            <View style={styles.txtInputContainer}>
              <TextInput
                style={styles.txtInput}
                value={txtInputEventName}
                onChangeText={setTxtInputNewEventName}
                placeholder="Nhập để thêm sự kiện mới... "
              />

              <TouchableOpacity onPress={showDatePicker} style={styles.btn}>
                <FontAwesome
                  name="calendar-plus-o"
                  size={24}
                  color={colors.blue}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Button
                buttonStyle={[styles.btn]}
                onPress={addEvent}
                disabled={!txtInputEventName}
                type="clear"
              >
                <FontAwesome
                  name="send"
                  color={
                    txtInputEventName ? COLORS.primary : COLORS.secondaryGray
                  }
                  size={24}
                />
              </Button>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
    borderWidth: 1,
  },
  txtInput: {
    color: colors.black,
    flex: 1,
    paddingHorizontal: 10,
  },

  btn: {
    padding: 6,
    marginHorizontal: 5,
    backgroundColor: "white",
  },
});
