import { ColorValue, StyleSheet, Text, View } from 'react-native';
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

interface ContatoItemProps { 
  nome : string
  telefone : string
  email : string
  corFundo : ColorValue
}

const ContatoItem = ( props: ContatoItemProps ) : React.ReactElement => { 
  /*
      props  === {  telefone : "3333",
                    email: "jose@teste.com",
                    id: 3   }
  */
  return (
    <View style={{backgroundColor: props.corFundo, borderWidth: 1,
      borderRadius: 16, padding: 10, margin: 10
    }}>
      <Text style={{fontSize: 18}}>Nome: {props.nome}</Text>
      <Text style={{fontSize: 16}}>Telefone: {props.telefone}</Text>
      <Text style={{fontSize: 16}}>Email: {props.email}</Text>
    </View>
  )
}


const ListaContatosItem = () => { 
    // Criar lista de elementos visuais usando MAP
    const listaElementosVisuais : React.ReactElement[] = listaContatos.map(  
      ( contato : Contato ) =>  <ContatoItem email={contato.email} 
      nome={contato.nome} telefone={contato.telefone} corFundo="lightyellow"/>     
        // Codigo a ser executado para cada elemento da lista
   )
   return listaElementosVisuais
}



export default function App() {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      { 
        (listaContatos.length > 0) ? 
            <ListaContatosItem/>  : 
            <Text>Não foram localizados contatos</Text> 
      }
    </View>
  );
}
