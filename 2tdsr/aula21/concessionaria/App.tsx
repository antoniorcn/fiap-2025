import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CarroScreen } from './CarroScreen';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Concessionaria</Text>
        <StatusBar style="auto" />
        <CarroScreen/>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
