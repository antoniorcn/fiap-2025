import { FlatList, ColorValue, StyleSheet, ListRenderItemInfo, Text, View } from 'react-native';
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
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
  {id: 1, nome: "Joao", telefone: "1111", email: "joao@teste.com"},
  {id: 2, nome: "Maria", telefone: "2222", email: "maria@teste.com"},
  {id: 3, nome: "Jose", telefone: "3333", email: "jose@teste.com"},
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

const ContatoItem = ( props: ListRenderItemInfo<Contato> ) : React.ReactElement => { 
  /*
      props  === { item : { telefone : "3333",
                            email: "jose@teste.com",
                            id: 3   } }
  */
  return (
    <View style={{borderWidth: 1,
      borderRadius: 16, padding: 10, margin: 10
    }}>
      <Text style={{fontSize: 18}}>Nome: {props.item.nome}</Text>
      <Text style={{fontSize: 16}}>Telefone: {props.item.telefone}</Text>
      <Text style={{fontSize: 16}}>Email: {props.item.email}</Text>
    </View>
  )
}

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      { 
        (listaContatos.length > 0) ? 
            <FlatList data={listaContatos} renderItem={ContatoItem}/>  : 
            <Text>Não foram localizados contatos</Text> 
      }
    </View>
  );
}
