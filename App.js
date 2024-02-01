import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import index from './src/screens';
import Playground from './src/screens/Playground';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen';
import AuthNavigator from './src/navigators/AuthNavigator';


const NativeStack = createNativeStackNavigator();
export default function App() {
  const [isShowSplashScr, setIsShowSplashScr] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplashScr(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [])


  return (isShowSplashScr ? (<SplashScreen />) : (<AuthNavigator />)

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