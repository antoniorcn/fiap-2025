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

const Principal = () => { 

  const listaTela : React.ReactElement[] = [];

  // for (let contato of contatos) { 
  //   listaTela.push(
  //     <View style={{backgroundColor: "lightcyan",
  //       margin: 5, borderWidth: 1, padding: 5, 
  //     }}>
  //       <Text>Id: {contato.id}</Text>
  //       <Text>Nome: {contato.nome}</Text>
  //       <Text>Telefone: {contato.telefone}</Text>
  //       <Text>Email: {contato.email}</Text>
  //     </View>
  //   )
  // }

  const listaVisuais = contatos.map(  
      ( item : Contato ) => {
        return (
          <View style={{backgroundColor: "lightyellow",
                  margin: 5, borderWidth: 1, padding: 5, 
                }}>
            <Text>Id: {item.id}</Text>
            <Text>Nome: {item.nome}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        );
      });

  return (
    <View>
      {listaVisuais}
    </View>
  )
}

export default Principal;