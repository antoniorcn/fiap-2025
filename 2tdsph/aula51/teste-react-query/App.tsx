import { StatusBar } from 'expo-status-bar';
import { ReactElement, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';

interface Contato  { 
  id: number;
  nome : string;
  telefone : string;
  email: string;
}

const contatos : Contato[] = [
    {id: 1, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 2, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 3, nome: "Alberto Silva", telefone: "(11) 3333-3333", email: "alberto@teste.com"},
    {id: 4, nome: "Camila Silva", telefone: "(11) 4444-4444", email: "camila@teste.com"}
  ];

interface ListagemProps { 
  // loading : boolean;
  // setLoading : ( value : any ) => void;
}

const Listagem : React.FC<ListagemProps> = ( props ) => {
  // const {loading, setLoading} = props;
  // const [lista, setLista] = useState<Contato[]>(contatos);

  const carregarDados = async ( duration : number ) : Promise<Contato[]> => { 
    // Serve para fazer um wait (aguardar um tempinho)
    await new Promise( resolve => setTimeout(resolve, duration))
    return contatos;
  } 

  const queryConsulta = useQuery({
    queryKey: ["contatos"],
    queryFn: async () => {
      try {
        // setLoading(true);
        const dados = await carregarDados( 3000 );
        // setLoading(false);
        return dados
      } catch ( err ) { 
        console.log("Erro ==> ", err);
        // setLoading( false );
        return []
      }
    },
    staleTime: 5
  });

  return (
    <View style={{marginVertical: 30}}>
      <Button title="Refresh" onPress= {
        ()=> { console.log( queryConsulta.data ); }
      }/>
      {queryConsulta.isLoading || queryConsulta.isFetching ? 
      (<View style={{flex: 1, marginVertical: 30, alignItems: "center"}}>
          <ActivityIndicator size="large" />
          <Text>Carregando...</Text>
        </View>) : 
      (
        <FlatList data={ queryConsulta.data }
          keyExtractor={( flatProps )=>`contato-${flatProps.id}`}
          renderItem={
            ({item} :ListRenderItemInfo<Contato> ) : ReactElement<any> => {
              return( 
              <View style={{margin: 10, padding: 10, backgroundColor: "lightcyan",
                borderWidth: 1, borderColor: "red", borderRadius: 10
              }}>
                <Text>Nome: {item.nome}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Telefone: {item.telefone}</Text>
              </View>)
            }
          }
        />
      )
      }
    </View>
  );
}

export default function App() {

  const rqClient = new QueryClient();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <QueryClientProvider client={rqClient}>
      <View style={styles.container}>
        <Listagem loading={loading} setLoading={setLoading}/>
        <StatusBar style="auto" />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
