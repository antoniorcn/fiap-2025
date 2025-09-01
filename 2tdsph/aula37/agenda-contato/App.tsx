import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContatoView } from './view/ContatoView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Agenda de Contato</Text>
        <StatusBar style="auto" />
        {/* <ContatoView/> */}
        <LoginView/>
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
