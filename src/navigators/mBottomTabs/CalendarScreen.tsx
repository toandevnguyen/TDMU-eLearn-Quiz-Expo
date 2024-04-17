import { Image, Overlay } from "@rneui/themed";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Image,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";

import testIDs from "../testIDs";

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

const CalendarScreen = () => {
  const [selected, setSelected] = useState("");
  const [items, setItems] = useState(undefined);
  const [IsOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const loadItems = (day) => {
    // Tạo một item mới cho ngày được chọn
    const numItems = 1; // Giả sử bạn chỉ muốn một item
    const newItems = {};
    // const newItems = { ...items };
    const time = day.timestamp; // Lấy timestamp của ngày được chọn
    const strTime = timeToString(time);
    newItems[strTime] = []; // Khởi tạo mảng cho ngày này nếu chưa có

    for (let j = 0; j < numItems; j++) {
      newItems[strTime].push({
        name: "Item for " + strTime + " #" + j,
        height: 50,
        day: strTime,
      });
    }
    setItems(newItems);
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0]; //Ký tự "T" được sử dụng trong chuỗi đại diện cho ngày tháng theo định dạng ISO 8601 để phân tách giữa phần ngày và phần thời gian. Ví dụ: 2023-01-01T12:00:00, phương thức split sẽ cắt từ phần tử ở vị trí 0 cho đến phần tử có ký tự là "T"
    // const hours = date.getHours();
    // const minutes = date.getMinutes();
    // const seconds = date.getSeconds();
    // return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Agenda
        onDayPress={(day) => {
          setSelected(day.dateString);
          console.log("selected day", day);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            marked: true,
            // selectedColor: "rgb(6, 175, 248)",
          },
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={loadItems}
        selected={selected}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        hideKnob={false}
        showClosingKnob
        // Agenda theme
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e",
        }}
      />
      <TouchableOpacity
        style={styles.bottomRight}
        onPress={() => {
          // setIsOpenBottomSheet(true);
          console.log("Press");
        }}
      >
        <Image
          placeholderStyle={styles.bottomRight}
          source={require("../../assets/gif/plus-no-bkg.gif")}
          resizeMode="center"
          style={styles.image}
        />
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={() => setOverlayVisible(!overlayVisible)}
        >
          {/* <AddServiceCPN /> */}
        </Overlay>
      </TouchableOpacity>
      {/* <RNE_BottomSheetComponent /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "rgb(255, 255, 255)",
  },
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
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green",
  },
  dayItem: {
    marginLeft: 34,
  },
  bottomRight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60, // Kích thước cố định cho phần tử con
    height: 60,
    backgroundColor: "rgba(8, 1, 1, 0)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default React.memo(CalendarScreen);
// export default CalendarScreen;
