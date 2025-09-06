import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ContatoView from './view/ContatoView';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from './view/LoginView';
import { useState } from 'react';
import { RootStack } from './navigation/navigationDefinition';
import { MainContext } from './contexto/contextoPrincipal';

const {Navigator, Screen} = RootStack;

export default function App() {
  const [token, setToken] = useState<string | null>( null );
  return (
    <MainContext.Provider value={{token, setToken}} >
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Meu App</Text>
        <StatusBar style="auto" />
        <Navigator screenOptions={{headerShown: false}}
          initialRouteName={ token ? "Contato" : "Login" }>
          <Screen name="Contato" component={ContatoView}/>
          <Screen name="Login">
            {( navProps )=>
              <LoginView {...navProps} 
                // token={token} setToken={setToken}
              />}
          </Screen>
        </Navigator>
      </View>
    </NavigationContainer>
    </MainContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding: 15,
    justifyContent: 'center',
  },
});
