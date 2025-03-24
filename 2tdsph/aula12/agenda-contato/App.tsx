import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, FlatListProps, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';

interface Contato { 
  id : number
  nome : string
  telefone : string
  email : string
}

function ContatoView (props : ListRenderItemInfo<Contato>) : React.ReactElement { 
  return ( 
    <View style={styles.contato}>
      <Text>Nome: {props.item.nome}</Text>
      <Text>Telefone: {props.item.telefone}</Text>
      <Text>Email: {props.item.email}</Text>
    </View>
  )
}

interface FormularioProps {
  onGravar : (nome: string, email: string, telefone: string) => void
  navegar : (destino : string) => void
}

const Formulario = ( props : FormularioProps ) : React.ReactElement => { 
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  return ( 
    <View style={{flex: 1, 
      alignItems: "center", justifyContent: "space-around"}}>
      <Text style={{fontSize: 32}}>Agenda de Contato</Text>
      <TextInput style={styles.input} placeholder="Nome Completo"
        value={nome} onChangeText={( texto )=>{ setNome(texto) }}/>

      <TextInput style={styles.input} placeholder="Email"
        value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Telefone"
        value={telefone} onChangeText={setTelefone}/>
      <Button title="Adicionar" onPress={()=>{
        props.onGravar( nome, email, telefone )
      }}/>
      <Button title="Listagem" onPress={()=>{ 
        props.navegar("LISTA");    
      }}/>
  </View>
  )
} 

interface ListagemProps { 
  lista : Contato[]
  navegar : (destino : string) => void
}
const Listagem = (props : ListagemProps ) : React.ReactElement => {
  return (
    <View style={{flex: 2}}>
      <FlatList data={props.lista} renderItem={ContatoView}
          keyExtractor={( item : Contato ) =>{ return "contato_key_" + item.id }}/>
      <Button title="Formulario" onPress={()=>{ 
        props.navegar("FORM");    
      }}/>
    </View>
  )
}

export default function App() {
  const [tela, setTela] = useState("FORM");
  const [listaContatos, setListaContatos] = useState<Contato[]>(
    [ 
      {id: 1, nome: "Joao Silva", telefone : "(11)111-111", email: "joao@teste.com"},
      {id: 2, nome: "Maria Silva", telefone : "(11)222-222", email: "maria@teste.com"},
      {id: 3, nome: "Jose Santos", telefone : "(11)333-333", email: "jose@teste.com"},
      {id: 4, nome: "Antonio", telefone : "(11)1111-1111", email: "antonio@teste.com"},
    ]  
  )

  const gravar = (nome : string, email : string, telefone : string) => { 
    const obj = {id: 0, nome, email, telefone};
    const novaLista = [  ...listaContatos, obj  ];
    setListaContatos( novaLista );
  }

  const navegar = ( destino : string) : void => { 
    setTela( destino);
  }

  return (
    <View style={styles.container}>
      {
        tela === "FORM" ? 
        <Formulario  onGravar={gravar} navegar={ navegar }/> : 
        <Listagem lista={listaContatos} navegar={ navegar }/> 
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: { 
    backgroundColor: "lightcyan",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 16,
    padding: 5,
    margin: 10,
    alignSelf: "stretch"
  },
  contato: { 
    backgroundColor: "lightyellow",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 16,
    padding: 5,
    margin: 10,
    alignSelf: "stretch"
  }
});