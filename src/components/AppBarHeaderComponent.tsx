import * as React from "react";
import { Appbar } from "react-native-paper";

export default function AppBarHeaderComponent() {
  return (
    <Appbar.Header style={{ width: "100%" }}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="Triết học" />
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
}
