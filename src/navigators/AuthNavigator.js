import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';

export default function AuthNavigator() {
    const NativeStack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <NativeStack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <NativeStack.Screen name='LoginScreen' component={LoginScreen} />
            </NativeStack.Navigator>
        </NavigationContainer>

    )
}

const styles = StyleSheet.create({})