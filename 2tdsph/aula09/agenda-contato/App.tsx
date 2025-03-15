import React from 'react';
import { Button, ColorValue, FlatList, ListRenderItemInfo, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface FormularioProps { 
  versao : string
  titulo? : string
}

interface Contato { 
  nome : string
  telefone : string
  email : string
}

const contatos : Contato[] = [
  {nome: "Joao", telefone: "(11)111", email: "joao@teste.com"},
  {nome: "Maria", telefone: "(11)222", email: "maria@teste.com"},
  {nome: "Jose", telefone: "(11)333", email: "jose@teste.com"},
] 

const Formulario = ( props : FormularioProps ) => { 
  /* props === { versao: "1.1",
                 onPress: {()=>{}},
                 titulo: "Contato"   }
  */
  return (
    <View>
      <Text>Agenda de Contato {props.versao}</Text>
      <Text>Formulario</Text>
      <TextInput placeholder="Nome" />
      <TextInput placeholder="Telefone" />
      <TextInput placeholder="Email" />
      <View style={{flexDirection: "row"}}>
        <Button title="Gravar"/>
        <Button title="Pesquisar"/>
      </View>
    </View>
  )
}

interface ContatoItemProps { 
  nome : string
  telefone : string
  email : string
}

interface Contato { 
  nome : string
  telefone : string
  email : string
}

const contatos : Contato[] = [
  {nome: "Joao", telefone: "(11)111", email: "joao@teste.com"},
  {nome: "Maria", telefone: "(11)222", email: "maria@teste.com"},
  {nome: "Jose", telefone: "(11)333", email: "jose@teste.com"},
] 

const ContatoItem = ( props : ListRenderItemInfo<Contato> ) => { 
  return (
    <View>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  )
}


export default function App() {
  return (
    <View>
      <StatusBar style="light" />
      <FlatList data={contatos} renderItem={ContatoItem}
        keyExtractor={( item : Contato )=>item.nome}
      />
    </View>
  );
}