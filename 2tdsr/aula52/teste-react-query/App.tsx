import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, 
  ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { QueryClientProvider, QueryClient, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface Contato { 
  nome: string;
  telefone: string;
  email: string;
}


const listaInicial : Contato[] = [
  {nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
  {nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
  {nome: "Alberto Santos", telefone: "(11) 3333-3333", email: "alberto@teste.com"},  
];

interface ListagemProps {
  lista : Contato[]
}

const Listagem : React.FC<ListagemProps> = ( {lista} ) => {
  
  const [buscaNome, setBuscaNome] = useState<string>("");

  const carregarDados = async ( milisegundos : number, nome : string): 
        Promise<Contato[]> => { 
    await new Promise( resolve => setTimeout( resolve, milisegundos )  );
    return listaInicial.filter( ( contato : Contato )=> contato.nome.includes( nome ) )
  }

  const adicionar = async( milisegundos : number, nome : string, email : string ) => {
    await new Promise( resolve => setTimeout( resolve, milisegundos )  );
    const obj : Contato ={ nome, email, telefone: "(11) 5555-5555" }; 
    listaInicial.push( obj );
  }

  const queryClient = useQueryClient();

  const query = useQuery({ 
    queryKey: ["contatos", buscaNome],
    queryFn: () => carregarDados(3000, buscaNome),
    gcTime: 1000 * 60 * 5,
    // staleTime: 5000
    // refetchInterval: 5000
  });

  const adicionarMutation = useMutation({
    mutationFn: () => adicionar(1000, "Teste Um", "teste@teste.com"),
    onSuccess: () => { 
      // query.refetch()
      // queryClient.invalidadeQueries();
      query.refetch()
    } 
  })

  return (
    <View style={{flex: 1}}>
      <Text>Nome para procurar: </Text>
      <TextInput value={buscaNome} onChangeText={setBuscaNome}/>
      <Button title="Adicionar" onPress={ ()=>{
        adicionarMutation.mutateAsync();
      }}/>
      { (query.isLoading || query.isFetching || adicionarMutation.isPending) ? 
      (<ActivityIndicator size="large"/>) :
      (<FlatList 
        style={{margin: 30, padding: 10}}
        data={query.data} 
        renderItem={( {item} : ListRenderItemInfo<Contato> ): React.ReactElement =>
          <View style={{backgroundColor: "lightcyan", borderRadius: 20,
                     borderColor: "red", borderWidth: 2, margin: 10,
                     padding: 10}}>
            <Text>Nome: {item.nome}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Email: {item.email}</Text>
          </View>
      }/>)}
    </View>
  );
}

export default function App() {

  const queryClient : QueryClient = new QueryClient();
  const [lista, setLista] = useState<Contato[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text> Boas vindas ao React Query </Text>
        {/* <Button title="Carregar" onPress={async ()=>{
          setLoading(true);
          const dados = await carregarDados(3000);
          setLoading(false);
          setLista(dados);
        }}/> */}
        <Listagem lista={lista}/>
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
