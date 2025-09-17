import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ContatoView from './view/ContatoView';
<<<<<<< HEAD
import {NavigationContainer} from '@react-navigation/native';
=======
import { NavigationContainer } from '@react-navigation/native';
>>>>>>> b7e4730 (2tdsr aula 40)

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Meuu App</Text>
        <StatusBar style="auto" />
        <ContatoView/>
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
