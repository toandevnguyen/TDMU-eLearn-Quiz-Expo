import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Playground() {
  return (
    <View>
      <Text>Playground</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF',
        alignContent: 'center',
        justifyContent: 'center',
    }
})