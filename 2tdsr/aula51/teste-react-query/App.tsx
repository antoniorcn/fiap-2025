import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, FlatList, 
  ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
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
  
  const carregarDados = async ( milisegundos : number ): 
        Promise<Contato[]> => { 
    await new Promise( resolve => setTimeout( resolve, milisegundos )  );
    return listaInicial;
  }

  const query = useQuery({ 
    queryKey: ["contatos"],
    queryFn: () => carregarDados(3000)
  });

  return (
    <View style={{flex: 1}}>
      { (query.isLoading || query.isFetching) ? 
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
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
