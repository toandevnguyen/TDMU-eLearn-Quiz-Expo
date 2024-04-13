/** @format */

import React, { ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

import TextComponent from "./TextComponent";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

interface Props {
  styles?: StyleProp<ViewStyle>;
  text?: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
}

const ButtonComponent = (props: Props) => {
  const { styles, text, icon, onPress, color } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.button,
        {
          backgroundColor: color ?? colors.blue,
          // marginVertical: 10,
          // marginHorizontal: 10,
        },
        styles,
      ]}
    >
      {icon && icon}
      {text && (
        <TextComponent
          text={text}
          size={20}
          color={color ? colors.white : "#ffffff"}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
