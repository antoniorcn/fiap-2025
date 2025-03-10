import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Contato { 
  nome : string,
  telefone : string,
  email : string
}

const contatos : Contato[] = [
  { nome: "João Silva", telefone: "(11)111-111", email: "joao@teste.com"},   // 0
  { nome: "Maria Silva", telefone: "(11)222-222", email: "maria@teste.com"}, // 1
  { nome: "Jose Santos", telefone: "(11)333-333", email: "jose@teste.com"}   // 2

] 

function ContatoDetalhe( props ) : JSX.Element { 
  return (
  <View style={estilos.contato}> 
    <Text style={estilos.contatoTexto}>Nome: {props.nome}</Text>
    <Text style={estilos.contatoTexto}>Telefone: {props.telefone}</Text>
    <Text style={estilos.contatoTexto}>Email: {props.email}</Text>
  </View>
  )
}

export default function App() {
  const listaVisuais : React.ReactElement[] = [];
  for (const contato of contatos) { 
    listaVisuais.push(
      /* <View style={estilos.contato}> 
        <Text style={estilos.contatoTexto}>Nome: {contato.nome}</Text>
        <Text style={estilos.contatoTexto}>Telefone: {contato.telefone}</Text>
        <Text style={estilos.contatoTexto}>Email: {contato.email}</Text>
      </View>*/
      <ContatoDetalhe nome={contato.nome} 
            telefone={contato.telefone}
            email={contato.email}/>
    );
  }
  listaVisuais.push()
  return (
      /* <View style={estilos.container}>
        { contatos.length > 0 || listaVisuais }
        { contatos.length <= 0 || <Text>Sem contatos</Text> }
      </View>*/ 
      <View style={estilos.container}>
        {   (contatos.length > 0) ? 
              (listaVisuais) : 
              (<Text>Sem contatos</Text>)
          }
      </View>
  );
}

const estilos = StyleSheet.create({ 
  contato: { 
    backgroundColor: "lightyellow",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 16,
    padding: 10,
  },
  contatoTexto: { 
    fontSize: 14,
    fontWeight: "bold",
  },
  container: { 
    flex: 1,
    justifyContent: "center"
  }
})