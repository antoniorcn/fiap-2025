import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContatoView } from './view/ContatoView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';
import { useAppControl } from './control/appControl';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

export default function App() {

  const {token, setToken} = useAppControl();
  // const Contexto = useContext(ContextoPrincipal);

  return (
    <ContextoPrincipal.Provider value={{
      token, setToken
    }}>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Agenda de Contato</Text>
          <StatusBar style="auto" />
          <Navigator initialRouteName={token?"Contato":"Login"}>
            <Screen name="Contato" component={ContatoView}/>
            <Screen name="Login" component={LoginView}/>
          </Navigator>
        </View>
      </NavigationContainer>
    </ContextoPrincipal.Provider>
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
