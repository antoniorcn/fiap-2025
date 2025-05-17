import React from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const X = new Animated.Value(0);
  const Y = new Animated.Value(0);
  const Angulo = new Animated.Value(0);

  return (
    <View style={{flex: 1, justifyContent: "flex-start"}}>
      <Animated.View style={{
          width: 50,
          height: 50, 
          backgroundColor: "red",
          transform: [{translateX:X}, {translateY: Y}]
      }}/>
      <Button title="Animar" onPress={()=>{
          Animated.timing( X, {
            toValue: 200,
            duration: 5000,
            useNativeDriver: true
          }).start();
          Animated.timing( Y, {
            toValue: 200,
            duration: 5000,
            useNativeDriver: true
          }).start();
          Animated.timing( Angulo, {
            toValue: 200,
            duration: 5000,
            useNativeDriver: true
          }).start();
      }}/>
    </View>
  );
}