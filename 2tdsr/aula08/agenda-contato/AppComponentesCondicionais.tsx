import { StyleSheet, Text, View } from 'react-native';

interface Contato { 
  id : number
  nome : string
  telefone : string
  email : string
}

const listaContatos : Contato[] = [ 
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
]
export default function App() {
  //// Criar lista de elementos visuais usando FOR OF
  // const listaElementosVisuais : React.ReactElement[] = []
  // for ( const contato of listaContatos ) { 
  //   listaElementosVisuais.push(
  //     <View>
  //       <Text>Nome: {contato.nome}</Text>
  //       <Text>Telefone: {contato.telefone}</Text>
  //       <Text>Email: {contato.email}</Text>
  //     </View>
  //   )
  // }

  // Criar lista de elementos visuais usando MAP
  const listaElementosVisuais = listaContatos.map(  
     ( contato : Contato ) => {
      return (
        <View style={{backgroundColor: "lightgray", borderWidth: 1,
          borderRadius: 16, padding: 10, margin: 10
        }}>
          <Text style={{fontSize: 18}}>{contato.nome}</Text>
          <Text style={{fontSize: 16}}>{contato.email}</Text>
          <Text style={{fontSize: 16}}>{contato.telefone}</Text>
        </View>
      )
     }         // Codigo a ser executado para cada elemento da lista
  )

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      {/* {(listaContatos.length <= 0) && <Text>Não foram encontrados contatos</Text>}
      {listaElementosVisuais} */}

      { 
        (listaContatos.length > 0) ? 
            listaElementosVisuais  : 
            <Text>Não foram localizados contatos</Text> 
      }

    </View>
  );
}
