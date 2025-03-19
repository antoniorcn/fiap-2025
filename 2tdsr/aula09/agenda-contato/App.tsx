import { FlatList, ColorValue, StyleSheet, ListRenderItemInfo, 
          Text, View, TextInput, Button, Modal } from 'react-native';
interface Produto { 
	codigo : string
	nome : string
	descricao : string
	preco : number
}

const listaProdutos : Produto[] = [ 
  {codigo: "150", nome: "Detergente Ype", descricao: "Detergente sabor melancia com glicerina", preco: 2.5},
  {codigo: "160", nome: "Air Fryer", descricao: "Ayer frier 220V Eletrolux", preco: 345.0},
  {codigo: "170", nome: "Bicicleta Caloi", descricao: "Bicicleta aro 27 caloi, montain bike", preco: 1390.0},
  {codigo: "180", nome: "Playstation 4", descricao: "Video game Sony Playstation 4", preco: 1850.0},
]

const ProdutoItem = ( props: ListRenderItemInfo<Produto> ) : React.ReactElement => { 
  /*
      props  === { item : { codigo : "3333",
                            nome: "Detergente Ype",
                            descricao: "Detergente sabor melancia com glicerina",
                            preco : 2.5   } }
  */
  return (
    <View style={{borderWidth: 1,
      borderRadius: 16, padding: 10, margin: 10
    }}>
      <Text style={{fontSize: 18}}>Codigo: {props.item.codigo}</Text>
      <Text style={{fontSize: 16}}>Nome: {props.item.nome}</Text>
      <Text style={{fontSize: 16}}>Descricao: {props.item.descricao}</Text>
      <Text style={{fontSize: 18}}>Preco: R$ {props.item.preco}</Text>
    </View>
  )
}

const Login = () : React.ReactElement => { 
  return ( 
    <View style={{flex: 1, justifyContent: "space-around", 
            paddingVertical: 50, backgroundColor: "#666666AA"}}>
      <Text style={{fontSize: 40}}>Login</Text>
      <TextInput placeholder="Nome do usuario"/>
      <TextInput placeholder="Senha"/>
      <Button title="Logar"/>
    </View>
  )
}

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      { 
        (listaProdutos.length > 0) ? 
            <FlatList data={listaProdutos} renderItem={ProdutoItem}
                keyExtractor={(item : Produto) => {return item.codigo}}/>  : 
            <Text>Não foram localizados contatos</Text> 
      }
      <Modal visible={true} transparent={true}>
        <Login/>
      </Modal>
    </View>
  );
}
