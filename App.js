import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Playground from './src/navigators/Playground';
import React from 'react';
import { HomeScreen, SplashScreen } from './src/screens';
import { AuthNavigator, MainNavigator } from './src/navigators';


const NativeStack = createNativeStackNavigator();
export default function App() {
  const [isShowSplashScr, setIsShowSplashScr] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplashScr(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [])


  return (isShowSplashScr ? (<SplashScreen />) : (<MainNavigator />)

    // <NavigationContainer>
    //   <NativeStack.Navigator>
    //     <NativeStack.Screen name="Index" component={index}/>
    //     <NativeStack.Screen name="Playground" component={Playground}/>
    //   </NativeStack.Navigator>
    // </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// //TODO: hôm qua đã làm phút 5:11 