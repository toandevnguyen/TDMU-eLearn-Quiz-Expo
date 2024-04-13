/** @format */

import React, { ReactNode } from "react";
import {
  View,
  // Text,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
  isScroll?: boolean;
}

const Container = (props: Props) => {
  const { children, styles, isScroll } = props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
      {isScroll === false ? (
        <View style={[globalStyles.container, {}, styles]}>{children}</View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            globalStyles.container,
            {
              flexGrow: 1,
            },
            styles,
          ]}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Container;
