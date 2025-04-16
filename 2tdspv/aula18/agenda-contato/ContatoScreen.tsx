import { ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Contato } from './Contato';

const Tab = createBottomTabNavigator();

interface ContatoFormularioProps extends ParamListBase { 
    onGravar : ( nome : string, telefone: string, email : string ) => void   
  }
  
  const ContatoFormulario = (props : ContatoFormularioProps) :
         React.ReactElement => { 
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
  
    return (
      <View style={{flex: 1}}>
        <Text> Formulario de Contato </Text>
        <TextInput placeholder = "Nome Completo: "
          value={nome} onChangeText={setNome} />
        <TextInput placeholder = "Telefone: "
          value={telefone} onChangeText={setTelefone} />
        <TextInput placeholder = "Email: "
          value={email} onChangeText={setEmail} />
        <Button title="Gravar" onPress={()=>{
          props.onGravar( nome, telefone, email );
        }}/>
      </View>
    )
  }
  
  interface ContatoListagemProps extends ParamListBase { 
    lista : Contato[]
  }
  
  const ContatoListagem = (props : ContatoListagemProps) : React.ReactElement => { 
    return (
      <View style={{flex: 1}}>
        <Text> Listagem de Contato </Text>
        <FlatList data={props.lista} renderItem={( itemProps : any)=>{
          return ( 
            <View>
              <Text>Nome: {itemProps.item.nome}</Text>
              <Text>Telefone: {itemProps.item.telefone}</Text>
              <Text>Email: {itemProps.item.email}</Text>
            </View>
          )
        }}/>
      </View>
    )
  }
  
  interface ContatoModuloProps extends ParamListBase { 
    onGravar : (nome: string, telefone: string, email: string) => void
    lista : Contato[]
  }
  const ContatoModulo = (props : ContatoModuloProps) : React.ReactElement => {
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="ContatoFormulario">
            {(navProps : ParamListBase)=>
              <ContatoFormulario {...navProps} onGravar={props.onGravar}/>}
          </Tab.Screen>
          <Tab.Screen name="ContatoListagem">
            {(navProps : ParamListBase)=>
              <ContatoListagem {...navProps} lista={props.lista}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    )
  }
  
export { ContatoModulo }