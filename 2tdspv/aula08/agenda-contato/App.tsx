import React from 'react';
import {Text, View} from 'react-native';

interface Contato { 
  id: number;
  nome: string;
  telefone: string;
  email: string;
}
const contatos : Contato[] = [ 
  {id: 1, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"}
];

interface ContatoItemProps { 
    id: number
    nome: string
    email: string
    telefone?: string
    corFundo?: string
}

const ContatoItem = ( props : ContatoItemProps ) => { 
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
const MostrarContatos = () => { 
    const listaVisuais = contatos.map(  
    ( item : Contato ) => {       
        return (
        <ContatoItem nome={item.nome} id={item.id} 
            email={item.email} telefone={item.telefone} corFundo="pink" />
        );
    });
    return listaVisuais;
}


const Principal = () => { 
  return (
    <View style={{flex: 1, 
      justifyContent: "center"}}>
      {(contatos.length <= 0) && <Text>Não há contatos</Text>}
      <MostrarContatos/>
    </View>
  )
}

export default Principal;