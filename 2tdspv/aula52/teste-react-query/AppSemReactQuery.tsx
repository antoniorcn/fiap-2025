import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, 
  ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

interface Contato { 
  nome : string;
  telefone : string;
  email : string;
}

const listaContatos : Contato[] = [
  {nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
  {nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
  {nome: "Jose Santos", telefone: "(11) 3333-3333", email: "jose@teste.com"}
];

interface ListagemProps { 

}

const Listagem : React.FC<ListagemProps> = () => { 

  // const lista = [...listaContatos];
  const [lista, setLista] = useState<Contato[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const carregar = async () => {
    setLoading(true);
    await new Promise<void>( resolve => setTimeout( resolve, 3000 ) );
    setLista(listaContatos);
    setLoading(false);
  }

  return ( 
    <View style={{flex: 1}}>
      <Button title="Carregar" onPress={()=>carregar()} />
      {loading ? (<ActivityIndicator size="large"/>) :
      (<FlatList 
        data={lista}
        renderItem={( { item } : ListRenderItemInfo<Contato> )=>
        <View style={{backgroundColor: "lightcyan", borderColor: "red", borderWidth: 2,
          borderRadius: 20, margin: 15, padding: 10
        }}>
          <Text>Nome: {item.nome} </Text>
          <Text>Telefone: {item.telefone} </Text>
          <Text>Email: {item.email} </Text>
        </View>}/>)}
    </View>
  )

}


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Agenda de contatos</Text>
      <StatusBar style="auto" />
      <Listagem />
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
});
