import React from 'react';
import {ActivityIndicator, Modal, ScrollView, Text, View} from 'react-native';

interface Contato { 
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

interface ContatoItemProps { 
    id: number
    nome: string
    email: string
    telefone?: string
    corFundo?: string
}

const ContatoItem = ( props : ContatoItemProps ) : React.ReactElement => { 
  return (
    <View style={{backgroundColor: 
                        props.corFundo === undefined ? "lightyellow" : props.corFundo,
                margin: 5, borderWidth: 1, padding: 5, 
                }}>
        <Text>Id: {props.id}</Text>
        <Text>Nome: {props.nome}</Text>
        <Text>Telefone: {props.telefone}</Text>
        <Text>Email: {props.email}</Text>
    </View>
  )
}


interface MostrarContatosProps {
  lista : Contato[]
}

function MostrarContatos ( props : MostrarContatosProps ) : React.ReactElement { 
  const listaVisuais : React.ReactElement[] = props.lista.map(  
    ( item : Contato ) => {       
        return (
        <ContatoItem nome={item.nome} id={item.id} 
            email={item.email} telefone={item.telefone} corFundo="pink" 
            key={item.id}/>
        );
    });
    return <ScrollView>{listaVisuais}</ScrollView>;

}

// const MostrarContatos = ( props : MostrarContatosProps ) : React.FC[] => { 
// }


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
      <MostrarContatos lista={contatos}/>
      <Modal visible={true || contatos.length <= 0}
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