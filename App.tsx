import "expo-dev-client";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Provider } from "react-redux";

import Router from "./src/navigators/Router";
import { store } from "./src/redux/store";
import { SplashScreen } from "./src/screens";

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
        {isShowSplashScr === true ? <SplashScreen /> : <Router />}
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
