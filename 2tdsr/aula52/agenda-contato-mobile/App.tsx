import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ContatoView from './view/ContatoView';
import {NavigationContainer} from '@react-navigation/native';
import LoginView from './view/LoginView';
import { PrincipalNavigator } from './navegacao/navigationDefinition';
import RegistroView from './view/RegistroView';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { useState } from 'react';
import ProfileView from './view/ProfileView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const {Screen, Navigator} = PrincipalNavigator;

export default function App() {

  const [token, setToken] = useState<string|null>(null);
  const [email, setEmail] = useState<string|null>(null);

  const queryClient = new QueryClient({});

  const fecharSessao = () => { 
    setToken(null);
    setEmail(null);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ContextoPrincipal.Provider value={{
        token, setToken, email, setEmail, fecharSessao
      }}>
        <NavigationContainer>
          <View style={styles.container}>
            <Text>Meuu App</Text>
            <StatusBar style="auto" />
            <Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
              <Screen name="Contato" component={ContatoView}/>
              <Screen name="Login" component={LoginView}/>
              <Screen name="Registrar" component={RegistroView}/>
              <Screen name="Profile" component={ProfileView}/>
            </Navigator>
          </View>
        </NavigationContainer>
      </ContextoPrincipal.Provider>
    </QueryClientProvider>
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
