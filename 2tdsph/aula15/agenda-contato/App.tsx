import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReactNode } from 'react';

import { FontAwesome } from '@expo/vector-icons';

const {Navigator, Screen} = createBottomTabNavigator();

interface FormularioProps {
}
const Formulario = ( props : FormularioProps ) : 
    React.ReactElement => { 
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 48}}>Formulário</Text>
      <Button title="Ir para Listagem" 
          onPress={()=>{props.navigation.navigate("Lista")}}/>
    </View>
  )
}

interface ListagemProps extends ParamListBase { 
}
const Listagem = ( props : ListagemProps ) : React.ReactElement => {
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 48}}>Listagem</Text>
    </View>
  );
}

const Cabecalho = () : React.ReactElement => { 
  return (
    <View>
      <Text>FIAP - 2025</Text>
      <Text>Aula de Mobile</Text>
      <Text>Navegação por Bottom Tabs</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Cabecalho/>
        <Navigator screenOptions={{
          headerStyle: {backgroundColor: "yellow"},
          headerTitleAlign: "center"
        }}>
          <Screen name="Form" component={Formulario} options={{
            title: "Formulario",
            tabBarIcon : ( screenProps : any ) : ReactNode => {
              const texto = screenProps.focused ? "Foco" : "Fora de foco"
              return (<FontAwesome name="wpforms" 
                        size={screenProps.size} 
                        color={screenProps.color}/>)
            }
          }}/>
          <Screen name="Lista" component={Listagem} options={{
            title: "Listagem",
            tabBarIcon : ( screenProps : any ) : ReactNode => 
              <FontAwesome name="list" 
                        size={screenProps.size} color={screenProps.color}/>
            
          }}/>
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
