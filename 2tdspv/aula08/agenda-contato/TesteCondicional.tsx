import React from 'react';
import {Text, View} from 'react-native';

interface Contato { 
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

const contatos : Contato[] = [ 
  // {id: 1, nome: "João", telefone: "(11) 111-111", email: "joao@teste.com"},
  // {id: 2, nome: "Maria", telefone: "(11) 222-222", email: "maria@teste.com"},
  // {id: 3, nome: "Jose", telefone: "(11) 333-333", email: "jose@teste.com"}
];


const Home = () => { 
  return (<View style={{
        backgroundColor: "lightcyan",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>
    <Text style={{fontSize: 32}}>Home</Text>
  </View>)
}

const Login = () => { 
  return (<View style={{
        backgroundColor: "lightyellow",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>
    <Text style={{fontSize: 32}}>Login</Text>
  </View>)
}

const Principal = () => { 

  const listaTela : React.ReactElement[] = [];

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
    <View style={{flex: 1, 
      justifyContent: "center"}}>
      {(contatos.length <= 0) && <Text>Não há contatos</Text>}
      {listaVisuais}
    </View>
  )
}

const App = () => { 
  const nomeTela = "home";
  return ( 
    <View style={{flex: 1}}>
      { (nomeTela === "home") && <Home/>} 
      { (nomeTela !== "home") && <Login/>} 
    </View>
  )
}

const App2 = () => { 
  const nomeTela = "home";
  return ( 
    (nomeTela === "home") ? <Home/> : <Login/>
  )
}

export default App2;