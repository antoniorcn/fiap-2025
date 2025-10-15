import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Modal} from 'react-native';
import ContatoView from './view/ContatoView';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from './view/LoginView';
import TopBar from './components/TopBar';
import { RootStack } from './navigation/navigationDefinition';
import RegistroView from './view/RegistroView';
import { useAppControl } from './control/appControl';
import { StackHeaderProps } from '@react-navigation/stack';
import ProfileView from './view/ProfileView';
import { VaiContexto } from './contexto/vaicontexto';

const {Navigator, Screen} = RootStack;

export default function App() {
  const {loading, token, setToken, email, setEmail, 
    abrirSessao, fecharSessao} = useAppControl();

  if (loading) { 
    return( 
      <Modal style={{flex: 1}}>
        <ActivityIndicator size={40}/>
        <Text>Carregando....</Text>
      </Modal>
    )
  }

  return (
    <VaiContexto.Provider value = {{
      token, email, setToken, setEmail
    }}>
      <NavigationContainer>
        <View style={styles.container}>
          <Text>Meu App</Text>
          <StatusBar style="auto" />
          <Navigator screenOptions={{headerShown: true,
            header: ( navProps : StackHeaderProps )=>
                <TopBar {...navProps} />
          }}
            initialRouteName={ token ? "Contato" : "Login" }>
            <Screen name="Contato" component={ContatoView}/>
            <Screen name="Registro" component={RegistroView}/>
            <Screen name="Perfil" component={ProfileView}/>
            <Screen name="Login">
              {( navProps )=>
                <LoginView {...navProps} />}
            </Screen>
          </Navigator>
        </View>
      </NavigationContainer>
    </VaiContexto.Provider>
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
