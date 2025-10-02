import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContatoView } from './view/ContatoView';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from './view/LoginView';
import { useAppControl } from './control/appControl';
import { ContextoPrincipal } from './contexto/contextoPrincipal';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterView } from './view/RegisterView';
import Cabecalho from './components/Cabecalho';
import { ProfileView } from './view/ProfileView';

const {Navigator, Screen} = createStackNavigator();

export default function App() {

  const {token, emailProfile, setProfile, loading } = useAppControl();

  if (loading) { 
    return
  }

  return (
    <ContextoPrincipal.Provider value={{
      token, emailProfile, setProfile
    }}>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Agenda de Contato</Text>
          <StatusBar style="auto" />
          <Navigator screenOptions={{header: ()=><Cabecalho/>}}
            initialRouteName={token?"Contato":"Login"}>
            <Screen name="Contato" component={ContatoView}/>
            <Screen name="Login" component={LoginView}/>
            <Screen name="Register" component={RegisterView}/>
            <Screen name="Profile" component={ProfileView}/>
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
