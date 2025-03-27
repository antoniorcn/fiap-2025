import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

interface Contato {
  nome : string;
  telefone : string;
  email : string;
}

const Formulario = (props : any) : React.ReactElement => { 
    // Montar um formulario com 3 TextInputs uma para nome
    // outro para o telefone e um terceiro para o email
    // e um botão de salvar>
    return (
      <View style={{flex: 1, justifyContent: "flex-start",
        padding: 20, marginTop: 30,
        backgroundColor: "lightyellow"
      }}>
        <Text style={{fontSize: 32}}>Formulario</Text>
        <TextInput placeholder="Nome" 
          style={{backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 1,
          borderRadius: 16, marginVertical: 10}} />
        <TextInput placeholder="Telefone" 
          style={{backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 1,
          borderRadius: 16, marginVertical: 10}} />
        <TextInput placeholder="Email" 
          style={{backgroundColor: "lightcyan", 
          borderColor: "red", borderWidth: 1,
          borderRadius: 16, marginVertical: 10}} />
        <Button title="Salvar" onPress={() => {}} />
        <Button title="Listagem" onPress={() => {
          props.navigation.navigate("listagem");
        }} />  
      </View>
    )
}

const ContatoItem = ( props : ListRenderItemInfo<Contato>) : 
      React.ReactElement => { 
  // Montar um componente que mostre o nome, telefone e email
  // de um contato

  return (
    <View style={{ borderColor: "red", borderWidth: 1,
      borderRadius: 16, marginVertical: 10,
      marginHorizontal: 5, padding: 10,
      backgroundColor: "lightyellow",
    }}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.email}</Text>
      <Text>{props.item.telefone}</Text>
    </View>
  )
}

const Listagem = ( props : any ) : React.ReactElement => { 
  // Montar uma FlatList para mostrar elementos do tipo ContatoItem
  // baseado em uma lista de contatos
  const listaContatos : Contato[] = [
    {nome: "Joao Silva", telefone: "(11)1111-1111", email: "joao@teste.com"},
    {nome: "Maria Silva", telefone: "(11)2222-2222", email: "maria@teste.com"}
  ];

  return ( 
    <View style={{flex: 1, justifyContent: "flex-start",
      padding: 20, marginTop: 30,
      backgroundColor: "lightcyan"
    }}>
      <Text style={{fontSize: 32}}>Listagem</Text>
      <FlatList data = {listaContatos} renderItem = {ContatoItem} />
      <Button title="Formulario" onPress={() => {
          props.navigation.navigate("formulario");
        }} />  
    </View>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator initialRouteName="formulario">
          <Screen name="formulario" component={Formulario} />
          <Screen name="listagem" component={Listagem} />
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
