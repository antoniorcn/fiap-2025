import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Screen, Navigator} = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const ContatoFormulario = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightyellow",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Formulario de Contatos</Text>
      <Button title="Salvar" 
          onPress={() => props.navigation.navigate("ContatoListagem")} />
    </View>
  )
}

const ContatoListagem = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightcyan",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Listagem de Contatos</Text>
    </View>
  )
}

const ContatoPrincipal = ( props : ParamListBase) : React.ReactElement => {
  return ( 
    <View style={{  flex: 1, 
                    alignItems: 'stretch', justifyContent: 'center' }}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="ContatoListagem" component={ContatoListagem} />
        <Tab.Screen name="ContatoFormulario" component={ContatoFormulario} />
      </Tab.Navigator>
    </View>
  )
}

const AnotacoesFormulario = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightyellow",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Formulario de Anotacoes</Text>
      <Button title="Salvar" 
          onPress={() => props.navigation.navigate("AnotacoesListagem")} />
    </View>
  )
}

const AnotacoesListagem = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightcyan",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Listagem de Anotacoes</Text>
    </View>
  )
}

const AnotacoesPrincipal = ( props : ParamListBase) : React.ReactElement => {
  return ( 
    <View style={{  flex: 1, 
                    alignItems: 'stretch', justifyContent: 'center' }}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="AnotacoesListagem" component={AnotacoesListagem} />
        <Tab.Screen name="AnotacoesFormulario" component={AnotacoesFormulario} />
      </Tab.Navigator>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Navegação Drawer</Text>
        <Navigator initialRouteName="ContatoPrincipal" screenOptions={{
          headerShown: true,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
            
          },
          drawerActiveBackgroundColor: 'blue',
          drawerInactiveBackgroundColor: 'lightblue',
          drawerPosition: 'left',
        }}>
          <Screen name="ContatoPrincipal" component={ContatoPrincipal} />
          <Screen name="AnotacoesPrincipal" component={AnotacoesPrincipal} />
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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
