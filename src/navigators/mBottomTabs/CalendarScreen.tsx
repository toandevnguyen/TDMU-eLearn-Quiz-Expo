import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import {
  Agenda,
  AgendaEntry,
  AgendaSchedule,
  DateData,
  LocaleConfig,
} from "react-native-calendars";
import DateTimePicker from "react-native-modal-datetime-picker";

import { colors } from "../../constants/colors";
import { COLORS } from "../../constants/theme";

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
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  useEffect(() => {
    // console.log("Items have changed:", selectedDay, items);
  }, [selectedDay, items]); // Re-render khi items thay đổi

  const handleDayPress = (day: DateData) => {
    setSelectedDay(day.dateString);
    // Tải các sự kiện của ngày được chọn vào items
    if (!items[day.dateString]) {
      items[day.dateString] = [];
    }
    setItems({ ...items });
  };

  const addEvent = () => {
    if (txtInputEventName) {
      const newItems = { ...items };

      if (!newItems[selectedDay]) {
        newItems[selectedDay] = [];
      }
      newItems[selectedDay].push({
        name: txtInputEventName,
        height: 50,
        day: "",
      });

      setItems(newItems);
      setTxtInputNewEventName(""); // Clear input after adding
    }
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text
          style={{
            fontSize: isFirst ? 16 : 14,
            color: isFirst ? "black" : "#43515c",
          }}
        >
          {reservation.name}
        </Text>
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
    <View style={{ flex: 1 }}>
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
        // pagingEnabled={true}
      />

      <View style={styles.inputContainer}>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInput}
            value={txtInputEventName}
            onChangeText={setTxtInputNewEventName}
            placeholder="Enter event name"
          />
          {/* <DateTimePicker /> */}
          <TouchableOpacity
            onPress={addEvent}
            style={styles.btn}
            disabled={!txtInputEventName}
          >
            <FontAwesome name="send" color={COLORS.primary} size={24} />
          </TouchableOpacity>
        </View>
      </View>
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
    borderWidth: 0.2,
  },
  txtInput: {
    color: colors.black,
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  btn: {
    padding: 6,
    marginHorizontal: 5,
  },
});

// export default CalendarScreen;

// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import {
//   Agenda,
//   AgendaEntry,
//   AgendaSchedule,
//   LocaleConfig,
// } from "react-native-calendars";

// LocaleConfig.locales["vi"] = {
//   monthNames: [
//     "Tháng 1",
//     "Tháng 2",
//     "Tháng 3",
//     "Tháng 4",
//     "Tháng 5",
//     "Tháng 6",
//     "Tháng 7",
//     "Tháng 8",
//     "Tháng 9",
//     "Tháng 10",
//     "Tháng 11",
//     "Tháng 12",
//   ],
//   monthNamesShort: [
//     "Thg 1",
//     "Thg 2",
//     "Thg 3",
//     "Thg 4",
//     "Thg 5",
//     "Thg 6",
//     "Thg 7",
//     "Thg 8",
//     "Thg 9",
//     "Thg 10",
//     "Thg 11",
//     "Thg 12",
//   ],
//   dayNames: [
//     "Chủ Nhật",
//     "Thứ Hai",
//     "Thứ Ba",
//     "Thứ Tư",
//     "Thứ Năm",
//     "Thứ Sáu",
//     "Thứ Bảy",
//   ],
//   dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
//   today: "Hôm nay",
// };

// LocaleConfig.defaultLocale = ["vi"];

// const CalendarScreen = () => {
//   const [items, setItems] = useState<AgendaSchedule>({});
//   const [selectedDay, setSelectedDay] = useState<string>("");
//   const [eventName, setEventName] = useState<string>("");

//   // Function to add event
//   const addEvent = () => {
//     const newItems = { ...items };
//     if (!newItems[selectedDay]) {
//       newItems[selectedDay] = [];
//     }
//     newItems[selectedDay].push({
//       name: eventName,
//       height: 0,
//       day: "",
//     });
//     setItems(newItems);
//     setEventName(""); // Clear the input
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Agenda
//         showClosingKnob
//         items={items}
//         loadItemsForMonth={(month) => {
//           console.log("trigger items loading");
//         }}
//         onDayPress={(day) => {
//           console.log("day pressed", day);
//           setSelectedDay(day.dateString);
//         }}
//         // selected={selectedDay}
//         renderItem={(item, firstItemInDay) => {
//           return (
//             <View style={styles.item}>
//               <Text>{item.name}</Text>
//             </View>
//           );
//         }}
//         renderEmptyData={() => {
//           return (
//             <View style={styles.emptyDate}>
//               <Text>No events planned</Text>
//             </View>
//           );
//         }}
//       />
//       <TextInput
//         style={styles.input}
//         value={eventName}
//         onChangeText={setEventName}
//         placeholder="Enter event name"
//       />
//       <Button title="Add Event" onPress={addEvent} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "white",
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30,
//   },
//   input: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//   },
// });

// export default CalendarScreen;

//TODO: tài liệu tham khảo: https://wix.github.io/react-native-calendars/docs/Components/Agenda#
//TODO: https://wix.github.io/react-native-calendars/docs/Components/Agenda#

// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Button,
//   Alert,
// } from "react-native";
// import {
//   Agenda,
//   AgendaEntry,
//   AgendaSchedule,
//   LocaleConfig,
// } from "react-native-calendars";

// import testIDs from "../testIDs";
// LocaleConfig.locales["vi"] = {
//   monthNames: [
//     "Tháng 1",
//     "Tháng 2",
//     "Tháng 3",
//     "Tháng 4",
//     "Tháng 5",
//     "Tháng 6",
//     "Tháng 7",
//     "Tháng 8",
//     "Tháng 9",
//     "Tháng 10",
//     "Tháng 11",
//     "Tháng 12",
//   ],
//   monthNamesShort: [
//     "Thg 1",
//     "Thg 2",
//     "Thg 3",
//     "Thg 4",
//     "Thg 5",
//     "Thg 6",
//     "Thg 7",
//     "Thg 8",
//     "Thg 9",
//     "Thg 10",
//     "Thg 11",
//     "Thg 12",
//   ],
//   dayNames: [
//     "Chủ Nhật",
//     "Thứ Hai",
//     "Thứ Ba",
//     "Thứ Tư",
//     "Thứ Năm",
//     "Thứ Sáu",
//     "Thứ Bảy",
//   ],
//   dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
//   today: "Hôm nay",
// };

// LocaleConfig.defaultLocale = ["vi"];

// interface State {
//   items?: AgendaSchedule;
//   newEventName: string;
//   selectedDay?: string;
// }

// export default class CalendarScreen extends Component<State> {
//   state: State = {
//     items: undefined,
//     newEventName: "",
//     selectedDay: undefined,
//   };

//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         <Agenda
//           // testID={testIDs.agenda.CONTAINER}
//           items={this.state.items}
//           loadItemsForMonth={this.loadItems}
//           selected={this.state.selectedDay}
//           onDayPress={this.handleDayPress}
//           renderItem={this.renderItem}
//           renderEmptyDate={this.renderEmptyDate}
//           rowHasChanged={this.rowHasChanged}
//           showClosingKnob
//           showOnlySelectedDayItems
//           hideExtraDays
//           pastScrollRange={6}
//           futureScrollRange={6}
//           showScrollIndicator={false}
//           enableSwipeMonths
//         />
//         <TextInput
//           style={styles.input}
//           value={this.state.newEventName}
//           onChangeText={(text) => this.setState({ newEventName: text })}
//           placeholder="Enter event name"
//         />
//         <Button
//           title="Add Event"
//           onPress={this.addEvent}
//           disabled={!this.state.newEventName}
//         />
//       </View>
//     );
//   }

//   handleDayPress = (day) => {
//     this.setState({ selectedDay: day.dateString });
//   };

//   addEvent = () => {
//     const { selectedDay, newEventName, items } = this.state;
//     if (selectedDay && newEventName) {
//       const newItems = { ...items };
//       if (!newItems[selectedDay]) {
//         newItems[selectedDay] = [];
//       }
//       newItems[selectedDay].push({
//         name: newEventName,
//         height: 50,
//         day: "",
//       });

//       this.setState({
//         items: newItems,
//         newEventName: "", // Clear input after adding
//       });
//     }
//   };

//   loadItems = (day) => {
//     // Here you can fetch data from server or perform complex operations to populate the calendar
//     console.log("loadItems for month", day.month);
//   };

//   renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
//     return (
//       <TouchableOpacity
//         // testID={testIDs.agenda.ITEM}
//         style={[styles.item, { height: reservation.height }]}
//         onPress={() => Alert.alert(reservation.name)}
//       >
//         <Text
//           style={{
//             fontSize: isFirst ? 16 : 14,
//             color: isFirst ? "black" : "#43515c",
//           }}
//         >
//           {reservation.name}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   renderEmptyDate = () => {
//     return (
//       <View style={styles.emptyDate}>
//         <Text>This is an empty date!</Text>
//       </View>
//     );
//   };

//   rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
//     return r1.name !== r2.name;
//   };
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "white",
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17,
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30,
//   },
//   input: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//   },
// });

//TODO: ExpandableCalendar
// import React, { useRef, useCallback } from "react";
// import { StyleSheet } from "react-native";
// import {
//   ExpandableCalendar,
//   AgendaList,
//   CalendarProvider,
//   WeekCalendar,
//   LocaleConfig,
// } from "react-native-calendars";

// import AgendaItem from "../../mocks/AgendaItem";
// import { agendaItems, getMarkedDates } from "../../mocks/agendaItems";
// import { getTheme, lightThemeColor, themeColor } from "../../mocks/theme";
// import testIDs from "../testIDs";

// LocaleConfig.locales["vi"] = {
//   monthNames: [
//     "Tháng 1",
//     "Tháng 2",
//     "Tháng 3",
//     "Tháng 4",
//     "Tháng 5",
//     "Tháng 6",
//     "Tháng 7",
//     "Tháng 8",
//     "Tháng 9",
//     "Tháng 10",
//     "Tháng 11",
//     "Tháng 12",
//   ],
//   monthNamesShort: [
//     "Thg 1",
//     "Thg 2",
//     "Thg 3",
//     "Thg 4",
//     "Thg 5",
//     "Thg 6",
//     "Thg 7",
//     "Thg 8",
//     "Thg 9",
//     "Thg 10",
//     "Thg 11",
//     "Thg 12",
//   ],
//   dayNames: [
//     "Chủ Nhật",
//     "Thứ Hai",
//     "Thứ Ba",
//     "Thứ Tư",
//     "Thứ Năm",
//     "Thứ Sáu",
//     "Thứ Bảy",
//   ],
//   dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
//   today: "Hôm nay",
// };

// LocaleConfig.defaultLocale = ["vi"];

// const rightArrowIcon = require("../../assets/images/next.png");
// const leftArrowIcon = require("../../assets/images/previous.png");
// const ITEMS: any[] = agendaItems;

// interface Props {
//   weekView?: boolean;
// }

// const ExpandableCalendarScreen = (props: Props) => {
//   const { weekView } = props;
//   const marked = useRef(getMarkedDates());
//   const theme = useRef(getTheme());
//   const todayBtnTheme = useRef({
//     todayButtonTextColor: themeColor,
//   });

//   // const onDateChanged = useCallback((date, updateSource) => {
//   //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
//   // }, []);

//   // const onMonthChange = useCallback(({dateString}) => {
//   //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
//   // }, []);

//   const renderItem = useCallback(({ item }: any) => {
//     return <AgendaItem item={item} />;
//   }, []);

//   return (
//     <CalendarProvider
//       date={ITEMS[1]?.title}
//       // onDateChanged={onDateChanged}
//       // onMonthChange={onMonthChange}
//       showTodayButton
//       // disabledOpacity={0.6}
//       theme={todayBtnTheme.current}
//       // todayBottomMargin={16}
//     >
//       {weekView ? (
//         <WeekCalendar
//           testID={testIDs.weekCalendar.CONTAINER}
//           firstDay={1}
//           markedDates={marked.current}
//         />
//       ) : (
//         <ExpandableCalendar
//           testID={testIDs.expandableCalendar.CONTAINER}
//           // horizontal={false}
//           // hideArrows
//           // disablePan
//           // hideKnob
//           // initialPosition={ExpandableCalendar.positions.OPEN}
//           // calendarStyle={styles.calendar}
//           // headerStyle={styles.header} // for horizontal only
//           // disableWeekScroll
//           theme={theme.current}
//           // disableAllTouchEventsForDisabledDays
//           firstDay={1}
//           markedDates={marked.current}
//           leftArrowImageSource={leftArrowIcon}
//           rightArrowImageSource={rightArrowIcon}
//           // animateScroll
//           // closeOnDayPress={false}
//         />
//       )}
//       <AgendaList
//         sections={ITEMS}
//         renderItem={renderItem}
//         // scrollToNextEvent
//         sectionStyle={styles.section}
//         // dayFormat={'yyyy-MM-d'}
//       />
//     </CalendarProvider>
//   );
// };

// export default ExpandableCalendarScreen;

// const styles = StyleSheet.create({
//   calendar: {
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   header: {
//     backgroundColor: "lightgrey",
//   },
//   section: {
//     backgroundColor: lightThemeColor,
//     color: "grey",
//     textTransform: "capitalize",
//   },
// });
