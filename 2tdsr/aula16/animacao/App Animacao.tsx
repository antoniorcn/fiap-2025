import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { Animated, Easing, Button, Pressable, 
  StyleSheet, Text, TextInput, View } from 'react-native';

const Botao = ( props : any ) : React.ReactElement =>  { 
  return (
      <View style={{left: 20, top: 10, backgroundColor: 'blue', 
            width: 100, height: 50, borderRadius: 10}}>
        <Text style={{fontSize: 32}} >{props.title}</Text>
      </View>
  )

}

export default function App() {
  const posY = new Animated.Value(-100);
  const posY2 = new Animated.Value(1000);
  const rotacao = new Animated.Value(0);
  useEffect(
    () => {
      Animated.timing(rotacao, {
        toValue: 360,
        duration: 2000,
        useNativeDriver: true
       }).start()
      Animated.sequence([
        Animated.timing( posY, {
          toValue : 450,
          duration: 500,
          delay: 100,
          easing: Easing.ease,
          useNativeDriver: true
        }),
        Animated.timing( posY2, {
          toValue : 550,
          duration: 1000,
          delay: 100,
          easing: Easing.ease,
          useNativeDriver: true
        }) 
      ]).start();
    }, []); 
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>UserName</Text>
      <TextInput/>
      <Text>Password</Text>
      <TextInput/>
      {/* <Botao title="Login" onPress={() => {}} />
      <Botao title="Signin" onPress={() => {}} /> */}
      <Animated.View style={{position: "absolute", 
                    left: 20, top: 10, backgroundColor: 'blue', 
                    width: 100, height: 50, borderRadius: 10,
                    transform: [
                      {translateX: 20},
                      {translateY: posY},
                      {rotate: rotacao.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                      })}
                    ]}}>
        <Text style={{fontSize: 32}} >Login</Text>
      </Animated.View>
      <Animated.View style={{position: "absolute", 
                    left: 20, top: 10, backgroundColor: 'blue', 
                    width: 100, height: 50, borderRadius: 10,
                    transform: [
                      {translateX: 20},
                      {translateY: posY2},
                      {rotate: rotacao.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                      })}
                    ] }}>
        <Text style={{fontSize: 32}} >SignIn</Text>
      </Animated.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
});
