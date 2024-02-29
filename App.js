import React from "react";

import { MBottomTabNavigator } from "./src/navigators";
import { SplashScreen } from "./src/screens";

export default function App() {
  const [isShowSplashScr, setIsShowSplashScr] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplashScr(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return isShowSplashScr ? <SplashScreen /> : <MBottomTabNavigator />;

  // <NavigationContainer>
  //   <NativeStack.Navigator>
  //     <NativeStack.Screen name="Index" component={index}/>
  //     <NativeStack.Screen name="Playground" component={Playground}/>
  //   </NativeStack.Navigator>
  // </NavigationContainer>
}
