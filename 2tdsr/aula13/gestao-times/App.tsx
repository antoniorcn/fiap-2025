import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Screen, Navigator} = createStackNavigator();

interface TimeFutebol { 
  nome : string
  divisao : string
  titulos : number
}

// interface TimeFormularioProps { 
// }

const TimeFormulario = ( props : any ): React.ReactElement => { 
  const [nome, setNome] = useState<string>("");
  const [divisao, setDivisao] = useState<string>("");
  const [numTitulos, setNumTitulos] = useState<string>("0");
  return ( 
    <View style={styles.containerFormulario}>
      <TextInput placeholder="Nome do Time" 
            value={nome} onChangeText={setNome} />
      <TextInput placeholder="Divisão"
            value={divisao} onChangeText={setDivisao}/>
      <TextInput placeholder="Número de títulos" 
            value={numTitulos} onChangeText={setNumTitulos} />
      <Button title="Gravar" onPress={()=>{
        props.onGravar(nome, divisao, numTitulos);
      }}/>
      <Button title="Ir para Listagem" onPress={()=>{
        props.navigation.navigate("listagem");
      }}/>
    </View>
  )
}


const TimeFutebolItem = ( props : ListRenderItemInfo<TimeFutebol>) 
      : React.ReactElement => {
  return (
    <View>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.divisao}</Text>
      <Text>{props.item.titulos}</Text>
    </View>
  )
}


// interface TimeListagemProps { 

// }
const TimeListagem = ( props : any) : React.ReactElement => { 
  return (
    <View style={styles.containerListagem}>
      <FlatList data={props.lista} renderItem={TimeFutebolItem} />
      <Button title="Ir para Formulario" onPress={()=>{
        props.navigation.navigate("formulario");
      }}/>
    </View>
  );
}


export default function App() {
  const [lista, setLista] = useState<TimeFutebol[]>([]);

  const gravar = (nome : string, divisao : string, titulos : number) => { 
    const obj = {nome, divisao, titulos};
    const novaLista = [ ...lista, obj ];
    setLista( novaLista );
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator initialRouteName="listagem">
          <Screen name="formulario">
            {(propsNav : any)=><TimeFormulario {...propsNav} onGravar={gravar} />}
          </Screen>
          <Screen name="listagem">
              {(propsNav : any)=><TimeListagem {...propsNav} lista={lista}/>}
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
    justifyContent: 'center',
  },
  containerFormulario: { 
    flex : 1,
    backgroundColor: 'lightyellow',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  containerListagem: { 
    flex : 1,
    backgroundColor: 'lightyellow',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
});
