import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

import { colors } from "../constants/colors";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/globalStyles";

interface Props {
  text: string;
  font?: string;
  color?: string;
  size?: number;
  type?: "title" | "description";
  styles?: StyleProp<TextStyle>;
  flex?: number;
  flexWrap?: string;
  alignItem?: string;
  numberOfLines?: number;
}

const TextComponent = (props: Props) => {
  const { text, font, color, size, type, styles, flex } = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          fontFamily: font
            ? font
            : type === "title"
              ? fontFamilies.bold
              : fontFamilies.regular,
          fontSize: size ? size : type === "title" ? 16 : 14,
          color: color ?? colors.white,
          flex: flex ?? 0,
        },
        styles,
      ]}
    >
      {text}
    </Text>
  );
};

export default TextComponent;
