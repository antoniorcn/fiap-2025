import React from 'react';
import { ActivityIndicator, FlatList, Modal, Text, ScrollView, View, ListRenderItemInfo, FlatListProps} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface Contato { 
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

const ContatoItem = ( props : ListRenderItemInfo<Contato> ) : React.ReactElement => { 
  return (
    <View style={{ margin: 5, borderWidth: 1, padding: 5 }}>
        <Text>Id: {props.item.id}</Text>
        <Text>Nome: {props.item.nome}</Text>
        <Text>Telefone: {props.item.telefone}</Text>
        <Text>Email: {props.item.email}</Text>
    </View>
  )
}

const Principal = () : React.ReactElement => { 
  const contatos : Contato[] = [ 
    {id: 1, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
    {id: 2, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
    {id: 3, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"},
    {id: 4, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
    {id: 5, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
    {id: 6, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"},
    {id: 7, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
    {id: 8, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
    {id: 9, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"},
    {id: 10, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
    {id: 11, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
    {id: 12, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"},
    {id: 13, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
    {id: 14, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
    {id: 15, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"}
  ];
  return (
    <View style={{flex: 1, 
      justifyContent: "center"}}>
      <StatusBar style="auto" backgroundColor="#00FF0033" hidden={false}
        animated={true} translucent={true}
      />
      {/* <FlatList data={contatos} renderItem={ContatoItem} 
            keyExtractor={ ( item: Contato, index: number ) => {return "K-" + item.id }}/> */}
      <FlatList data={contatos} renderItem={ContatoItem} 
            keyExtractor={ ( item: Contato, index: number ) => "K-" + index + "-" + item.id}/>
      <Modal visible={contatos.length <= 0}
            transparent={true}>
        <View style={{flex: 1, 
          justifyContent: "center", 
          alignItems: "center",
          backgroundColor: "#888888AA"  }}>
          <Text>Carregando contatos</Text>
          {/* <ActivityIndicator size={89} color="red" animating={true}/> */}
        </View>
      </Modal>
    </View>
  )
}

export default Principal;