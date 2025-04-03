import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Screen, Navigator} = createStackNavigator();

interface Jogo { 
  nome : string
  genero : string
  ano : number
}

interface FormularioProps extends ParamListBase { 
  onGravar : ( nome : string, genero : string, ano : number ) => void
}
const Formulario = (props : FormularioProps ) : React.ReactElement => { 
  const [nome, setNome] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInput placeholder="Nome do Jogo" 
            value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Genero" 
            value={genero} onChangeText={setGenero}/>
      <TextInput placeholder="Ano"
            value={ano} onChangeText={setAno}/>
      <Button title="Gravar Jogo" onPress={()=>{
        props.onGravar(nome, genero, parseInt(ano));
      }}/>
      <Button title="Ir Listagem" onPress={()=>{
        props.navigation.navigate("listagem")
      }}/>
    </View>
  )
}

const JogoItem = ( props : ListRenderItemInfo<Jogo> ) 
      : React.ReactElement => { 
  return (
    <View>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.genero}</Text>
      <Text>{props.item.ano}</Text>
    </View>
  );
}

interface ListagemProps extends ParamListBase{
  lista : Jogo[]
} 
const Listagem = ( props : ListagemProps ) :
     React.ReactElement => { 
  return (
    <View style={{flex: 1}}>
      <FlatList data={props.lista} renderItem={JogoItem}/>
      <Button title="Ir Formulario" onPress={()=>{
        props.navigation.navigate("formulario")
      }}/>
    </View>
  )
}

export default function App() {
  const [lista, setLista] = useState<Jogo[]>([
    {nome: "Super Mario World", genero: "aventura", ano: 1994}
  ]);

  const gravar = ( nome : string, genero : string, ano : number ) : void => { 
    const obj = {nome, genero, ano};
    const novaLista = [...lista, obj];
    setLista(novaLista);
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Gestão de Jogos</Text>
        <Navigator initialRouteName="formulario">
          {/* <Screen name="formulario" component={Formulario}/>
          <Screen name="listagem" component={Listagem}/> */}
          <Screen name="formulario">
            { ( navProps : ParamListBase) => 
                <Formulario {...navProps} onGravar={gravar}/> }
          </Screen>
          <Screen name="listagem">
            { (navProps : ParamListBase) => 
              <Listagem {...navProps} lista={lista}/>}
          </Screen>
        </Navigator>
{/* 
        <Formulario onGravar={gravar}/>
        <Listagem lista={lista}/> */}
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
