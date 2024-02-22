import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Playground from './Playground';
import { HomeScreen } from '../screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MainNavigator() {
    const NativeStack = createNativeStackNavigator();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <NativeStack.Navigator>
                    <NativeStack.Screen name='TDMU-eLearn-Quiz' component={HomeScreen} />
                    <NativeStack.Screen name='Playground' component={Playground} />
                </NativeStack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({})