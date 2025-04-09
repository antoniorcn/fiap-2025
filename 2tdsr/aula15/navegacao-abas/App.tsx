import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Animated } from 'react-native';

export default function App() {
  const X = useRef(new Animated.Value(0));
  return (
      <View style={styles.container}>
        <Text>Animação</Text>
        <Animated.View style={{
            width: 50,
            height: 50,
            top: 10,
            left: 0, 
            transform: [{translateX: X.current, translateY: X.current}],
            backgroundColor: "blue"
          }}
        />
        <Button title="Animar" onPress={
          ()=>{
            Animated.timing(X.current, {
              toValue: 500,
              duration: 5000,
              useNativeDriver: true,
             }).start();
          }
        }/>
        <Button title="Animar Volta" onPress={
          ()=>{
            Animated.timing(X.current, {
              toValue: 0,
              duration: 5000,
              useNativeDriver: true,
             }).start();
          }
        }/>        
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    backgroundColor: '#fff',
  },
});
