import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';


interface Contato { 
  nome : string
  telefone : string
  email : string
}

const ContatoItem = ( props : ListRenderItemInfo<Contato>) => { 
  return ( 
    <View style={styles.contatoItem}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  )
}

interface FormularioProps { 
  onSalvar : (nome: string, telefone: string, email: string) => void
}

const Formulario = ( props : FormularioProps ) : React.ReactElement => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={{flex: 1, 
        paddingVertical: 20, paddingHorizontal: 20,
        justifyContent: "space-around"}}>
      <Text style={{fontSize: 36}}>Agenda de Contato</Text>
      <TextInput style={styles.input} placeholder="Nome Completo"
        value={nome} onChangeText={( texto ) => setNome(texto)}/>
      <TextInput style={styles.input} placeholder="Telefone"
        value={telefone} onChangeText={setTelefone}/>
      <TextInput style={styles.input} placeholder="Email"
        value={email} onChangeText={setEmail}/>
      <Button title="Salvar" onPress={ () => { props.onSalvar(nome, telefone, email) }}/>
    </View>
  )
}

interface ListagemProps { 
  lista : Array<Contato>
}

const Listagem  = ( props : ListagemProps ) : React.ReactElement => {   return ( 
    <View style={{flex: 1}}>
      <FlatList data={props.lista} renderItem={ContatoItem}
        keyExtractor={ (item : Contato) => { return item.email }} />
    </View>
  )
}

export default function App() {
  // const listaContatos : Contato[] = [
  //   { nome: "Joao Silva", telefone: "111-111", email: "joao@teste.com"},
  //   { nome: "Maria Silva", telefone: "222-222", email: "maria@teste.com"}
  // ]

  const [listaContatos, setListaContatos] = useState<Contato[]>([
     { nome: "Joao Silva", telefone: "111-111", email: "joao@teste.com"},
     { nome: "Maria Silva", telefone: "222-222", email: "maria@teste.com"}
  ]);

  const salvar = ( nome : string, telefone : string, email : string ) => {
    console.log("Nome: " + nome);
    console.log("Telefone: " + telefone);
    console.log("Email: " + email);

    // listaContatos.push ( {nome: nome, telefone: telefone, email : email} )
    // listaContatos.push ( {nome, telefone, email} )
    const obj = {nome, telefone, email};
    const novaLista = [  ...listaContatos, obj ];
    setListaContatos( novaLista );
  }

  return (
    <View style={styles.container}>
      <Formulario onSalvar={salvar}/>
      <Listagem lista={listaContatos}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input : { 
    alignSelf: "stretch", 
    backgroundColor: "lightcyan",
    borderColor: "cyan",
    borderWidth: 2,
    borderRadius: 16,
  }, 
  contatoItem : {backgroundColor: "lightyellow", 
    marginHorizontal: 10, marginVertical: 5,
    paddingHorizontal: 20, paddingVertical: 5, 
    borderRadius: 16,
    borderWidth: 2, borderColor: "orange"
  }
});
