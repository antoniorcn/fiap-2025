import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

interface Produto { 
  id : number
  nome : string
  preco : number
  setor : string
}

// Para fazer a navegação é preciso instalar:
// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler

// Para rodar no emulador web é preciso instalar:
// npx expo install react-dom react-native-web @expo/metro-runtime

interface ProdutoFormularioProps extends ParamListBase {
  onGravar : (id : string, nome : string, preco : string, setor : string) => {}
}

const ProdutoFormulario = ( props : ProdutoFormularioProps ) : React.ReactElement => { 
  const [id, setId] = useState<string>( "0" );
  const [nome, setNome] = useState<string>( "" );
  const [preco, setPreco] = useState<string>( "0" );
  const [setor, setSetor] = useState<string>( "" );

  return ( 
    <View>
      <Text>Formulario</Text>
      <Text>ID</Text>
      <TextInput value={id} onChangeText={setId}/>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome}/>
      <Text>Preco</Text>
      <TextInput value={preco} onChangeText={setPreco}/>
      <Text>Setor</Text>
      <TextInput value={setor} onChangeText={setSetor}/>
      <Button title="Gravar" onPress={()=>{
        props.onGravar(id, nome, preco, setor)
      }} />
      <Button title="Listagem" onPress={()=>{
        props.navigation.navigate("produtoListagem");
      }} />
    </View>
  )
}

const ProdutoItem = ( props : ListRenderItemInfo<Produto> ) : React.ReactElement => { 
  return ( 
    <View>
      <Text>Id: {props.item.id}</Text>
      <Text>Nome: {props.item.nome}</Text>
      <Text>Preço: {props.item.preco}</Text>
      <Text>Setor: {props.item.setor}</Text>
    </View>
  )
}

interface ProdutoListagemProps extends ParamListBase {
  lista : Produto[]
 }

const ProdutoListagem = ( props : ProdutoListagemProps ) : React.ReactElement => { 
  return (
    <View>
      <FlatList data={props.lista} renderItem={ProdutoItem} />
      <Button title="Listagem" onPress={()=>{
          props.navigation.navigate("produtoFormulario");
        }} />
    </View>
  )
}


export default function App() {
  const [listaProduto, setListaProduto] = useState<Produto[]>([]);

  const gravar = (id : string, nome : string, preco : string, setor : string) => { 
    const produto = { id: parseInt(id), nome, preco : parseFloat(preco), setor }

    const novaLista = [ ...listaProduto, produto ];
    setListaProduto( novaLista );
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Produtos de supemercado</Text>

        <Navigator>
          <Screen name="produtoFormulario"> 
          {  ( navProps : ParamListBase ) => 
                <ProdutoFormulario {... navProps} onGravar={gravar}/> }
          </Screen>
          <Screen name="produtoListagem">
          { ( navProps : ParamListBase ) => 
            <ProdutoListagem {...navProps} lista={listaProduto}/>}
          </Screen>
        </Navigator>

        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
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
