import React, { ReactNode } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

import { globalStyles } from "../styles/globalStyles";

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const Section = (props: Props) => {
  const { children, styles } = props;

  return <View style={[globalStyles.section, {}, styles]}>{children}</View>;
};

export default Section;
