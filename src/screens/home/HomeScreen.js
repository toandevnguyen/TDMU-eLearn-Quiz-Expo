import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'world-affairs' })}
        >
          <Text style={styles.categoryTitle}>World-Affairs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'science' })}
        >
          <Text style={styles.categoryTitle}>Science</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'technology' })}
        >
          <Text style={styles.categoryTitle}>Technology</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'sports' })}
        >
          <Text style={styles.categoryTitle}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'sports' })}
        >
          <Text style={styles.categoryTitle}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.category}
          onPress={() => navigation.navigate('Playground', { category: 'sports' })}
        >
          <Text style={styles.categoryTitle}>Sports</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(6, 225, 249)",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  categoryContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: "rgb(255, 255, 255)",
  },
  category:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: "rgb(45, 173, 227)",
    shadowColor:'rgb(0, 0, 0)',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin:10,
    borderRadius: 10,

  },
  categoryTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    color:'rgb(0, 0, 0)'
  },


})