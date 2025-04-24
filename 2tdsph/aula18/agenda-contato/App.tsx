import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, ParamListRoute } from '@react-navigation/native';
import { createDrawerNavigator }  from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Feather, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';

const {Screen, Navigator} = createDrawerNavigator()

const Tab = createBottomTabNavigator();

interface Contato { 
  id : number
  nome : string
  telefone : string
  email : string
}

const ContatoFormulario = (props : any) : React.ReactElement => {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <View>
      <Text>Contato Formulario</Text>
      <TextInput style={styles.input} placeholder="Nome Completo:"
        value={nome} onChangeText={setNome}/>
      <TextInput style={styles.input} placeholder="Telefone:"
        value={telefone} onChangeText={setTelefone}/>
      <TextInput style={styles.input} placeholder="Email:"
        value={email} onChangeText={setEmail}/>
      <Button title="Gravar" onPress={()=>{
        props.onGravar(nome, telefone, email);
      }}/>
    </View>
  )
}

const ContatoItem = (props : any) : React.ReactElement => { 
  return (
    <View style={styles.contato_item}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  )
}

const ContatoListagem = (props : any) : React.ReactElement => { 
  return (
    <View>
      <Text>Contato Listagem</Text>
      <FlatList data={props.lista} renderItem={ContatoItem}/>
    </View>
  )
}


const Contatos = (props : any) : React.ReactElement => {
  const [lista, setLista] = useState<Contato[]>([]);
  const gravar = (nome :string, telefone : string, email : string) => { 
    setLista( [ ...lista, {id: 0, nome, telefone, email} ] )
  }
  return ( 
    <View style={{flex: 1}}>
      <Text>Contatos</Text>
      <Tab.Navigator screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name="contato-formulario" 
          options = {{
            title: "Formulário",
            tabBarIcon : ({color, size, focused})=>
              <FontAwesome5 name="clipboard" color={color} size={size}/>,
          }}>
            {(navProps : any)=><ContatoFormulario {...navProps} onGravar={gravar}/>}
        </Tab.Screen>
        <Tab.Screen name="contato-listagem" 
          options = {{
            title: "Listagem",
            tabBarIcon: ({color, size})=> 
              <Feather name="list" color={color} size={size}/>
          }}>
            {( navProps : any )=><ContatoListagem  {...navProps} lista={lista}/>}
          </Tab.Screen>

      </Tab.Navigator>
    </View>
  )
}

const CicloSocial = (props : any) : React.ReactElement => { 
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
        <Text>Cadastro de Amigos</Text>
        <Navigator>
          <Screen name="contatos" component={Contatos}
            options={{
              title: "Contatos",
              drawerIcon: ({size, color})=>
                <AntDesign name="contacts" color={color} size={size}/>
            }}/>
          <Screen name="ciclo-social" component={CicloSocial}
            options={{
              title: "Ciclo Social",
              drawerIcon: ({size, color})=>
                <FontAwesome6 name="people-group" color={color} size={size}/>
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
  contato_item : {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "lightyellow",
    margin: 10,
    padding: 10
  },
  input : { 
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'lightcyan',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 10,
    alignSelf: 'stretch'
  }
});
