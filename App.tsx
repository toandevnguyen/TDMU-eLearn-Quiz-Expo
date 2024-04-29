import "expo-dev-client";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import RouterNativeStack from "./src/navigators/RouterNativeStack";
import { store } from "./src/redux/store";
import { SplashScreen } from "./src/screens";
import { StatusBar } from "expo-status-bar";
import { colors } from "./src/constants/colors";

export default function App() {
  const [isShowSplashScr, setIsShowSplashScr] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplashScr(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontLoaded) {
    return <ActivityIndicator />;
  } else {
    return (
      <Provider store={store}>
        {/* <GestureHandlerRootView style={{ flex: 1, paddingTop: 30 }}> */}
        {/* <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}> */}
        <StatusBar style="inverted" backgroundColor={colors.darkBlue} />
        {isShowSplashScr === true ? <SplashScreen /> : <RouterNativeStack />}
        {/* </SafeAreaView> */}
        {/* </GestureHandlerRootView> */}
      </Provider>
    );
    // <>
    //   <StatusBar hidden />
    //   <Router />
    // </>
  }

  // return isShowSplashScr ? <SplashScreen /> : <MBottomTabNavigator />;

  // <NavigationContainer>
  //   <NativeStack.Navigator>
  //     <NativeStack.Screen name="Index" component={index}/>
  //     <NativeStack.Screen name="Playground" component={Playground}/>
  //   </NativeStack.Navigator>
  // </NavigationContainer>
}

//TODO:đang ở nhánh ToanDev
