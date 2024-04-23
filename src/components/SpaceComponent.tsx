/** @format */

import React from "react";
import { View, Text } from "react-native";

const SpaceComponent = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
};

export default SpaceComponent;
