import React from 'react';
import { Button, Modal, Text, TextInput, View } from 'react-native';
interface FormularioProps { 
  versao : string
  titulo? : string
}


const contatos = [
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

const ContatoItem = ( props : ContatoItemProps ) => { 
  return (
    <View>
      <Text>{props.nome}</Text>
      <Text>{props.telefone}</Text>
      <Text>{props.email}</Text>
    </View>
  )
}

interface ListagemProps { 
  versao : string
}

const Listagem = ( props : ListagemProps ) => { 
  const listaContatosVisuais : React.ReactElement[] = contatos.map( 
    ( elemento ) => { 
      return (
        <ContatoItem nome={elemento.nome} email={elemento.email} 
            telefone={elemento.telefone} />
      );
    }
  );
  return ( 
    <View>
      <Text>Agenda de contato {props.versao}</Text>
      {listaContatosVisuais}
    </View>
  )
}

export default function App() {
  return (
    <View>
      <Listagem versao="1.1" />
      <Modal visible={true} transparent={true} animationType="slide">
        <View style={{backgroundColor: "#555555DD", flex: 1}}>
          <Text>Login</Text>
          <TextInput placeholder="Usuario"/>
          <TextInput placeholder="Senha"/>
          <Button title="Login"/>
        </View>
      </Modal>
    </View>
  );
}