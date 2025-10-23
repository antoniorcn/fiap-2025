import { StatusBar } from 'expo-status-bar';
import { ReactElement, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList,  
  ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { QueryClientProvider, QueryClient, useQuery, useMutation } from '@tanstack/react-query';

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

}

const Listagem : React.FC<ListagemProps> = ( props ) => {

  const carregarDados = async ( duration : number, nome : string ) : Promise<Contato[]> => { 
    await new Promise( resolve => setTimeout(resolve, duration))
    return contatos.filter( ( contato )=>contato.nome.includes( nome ));
  } 

  const adicionar = async ( duration : number ) : Promise<void> => {
    await new Promise( resolve => setTimeout(resolve, duration));
    contatos.push({id: 10, nome: "Novo Contato", email: "contato@teste.com", telefone: "(1!) 5555-5555"});
  }

  // const queryConsulta = useQuery({
  //   queryKey: ["contatos"],
  //   queryFn: async () => {
  //     try {
  //       const dados = await carregarDados( 3000 );
  //       return dados
  //     } catch ( err ) { 
  //       console.log("Erro ==> ", err);
  //       return []
  //     }
  //   },
  //   staleTime: 5
  // });
  const [nome, setNome] = useState<string>("");

  const queryConsulta = useQuery({
    queryKey: ["contatos", nome],
    queryFn: async () => {
      try {
        const dados = await carregarDados( 3000, nome );
        return dados
      } catch ( err ) { 
        console.log("Erro ==> ", err);
        return []
      }
    },
    staleTime: 5,
    gcTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 5
  });


  const adicionarMutation = useMutation({
    mutationFn: ()=>adicionar(1000),
    onSuccess: ()=>queryConsulta.refetch()
  })

  return (
    <View style={{marginVertical: 30}}>
      <TextInput style={{borderWidth: 1, padding: 5}} 
      placeholder='Nome:' value={nome} onChangeText={setNome}/>
      <Button title="Adicionar" onPress={()=>{
        adicionarMutation.mutate();
      }}/>
      <Button title="Refresh" onPress= {
        ()=> { 
          queryConsulta.refetch();
         }
      }/>
      {queryConsulta.isLoading || queryConsulta.isFetching ||
        adicionarMutation.isPending ? 
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
        <Listagem />
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
