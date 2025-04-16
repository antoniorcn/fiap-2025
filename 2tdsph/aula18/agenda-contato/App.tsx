import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Screen, Navigator} = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const ContatoFormulario = () : React.ReactElement => { 
  return (
    <View>
      <Text> Formulario de Contato </Text>
    </View>
  )
}

const ContatoListagem = () : React.ReactElement => { 
  return (
    <View>
      <Text> Listagem de Contato </Text>
    </View>
  )
}

const ContatoModulo = () : React.ReactElement => {
  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="ContatoFormulario" component={ContatoFormulario}/>
        <Tab.Screen name="ContatoListagem" component={ContatoListagem}/>
      </Tab.Navigator>
    </View>
  )
}

const CicloSocialModulo = () : React.ReactElement => {
  return (
    <View>
      <Text>Ciclo Social</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator>
          <Screen name="Contato" component={ContatoModulo}/>
          <Screen name="CicloSocial" component={CicloSocialModulo}/>
        </Navigator>  
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
