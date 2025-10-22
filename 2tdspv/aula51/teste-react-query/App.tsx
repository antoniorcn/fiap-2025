import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, 
  ListRenderItemInfo, StyleSheet, Text, View, TextInput } from 'react-native';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';

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

  const [nome, setNome] = useState<string>("");


  const queryAll = useQuery({
    queryKey: ["contatos"],
    queryFn: ()=>carregar( "" ),
    // staleTime: 5000,
    refetchInterval: 1000 * 10
  });

  const queryPorNome = useQuery({
    queryKey: ["contatos", nome],
    queryFn: ()=>carregar( nome ),
    // staleTime: 5000,
    // refetchInterval: 5000,
    gcTime: 1000 * 60 * 10
  });

  const carregar = async ( nome : string   ) : Promise<Contato[]> => {
    await new Promise<void>( resolve => setTimeout( resolve, 3000 ) );
    return listaContatos.filter( (contato : Contato)=> contato.nome.includes(nome) );
  }

  const queryClient = new QueryClient();

  return ( 
    <View style={{flex: 1}}>
      <Text>Procurar por Nome: </Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Button title="Carregar" onPress={ () => {
          // queryClient.invalidateQueries(
          //   {queryKey: ["contatos", nome]},
          // )
          queryPorNome.refetch();
      }}/>
      {queryPorNome.isLoading || queryPorNome.isFetching ? (<ActivityIndicator size="large"/>) :
      (<FlatList 
        data={queryPorNome.data}
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

  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text>Agenda de contatos</Text>
        <StatusBar style="auto" />
        <Listagem />
      </View>
    </QueryClientProvider>
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
