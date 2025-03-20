import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';


function Contador() {
  const [contador, setContador] = useState( 10 );
  return (
    <View style={{flexDirection: "row"}}>
        <Button title="-" onPress={()=>{
          setContador( contador - 1 );
          console.log("Contador: ", contador);
        }} />
        <Text style={{fontSize: 60}}> {contador} </Text>
        <Button title="+" onPress={()=>{
          setContador( contador + 1 );
          console.log("Contador: ", contador);
        }}/>
      </View>
  )
} 


export default function App() {
  // const listaPonteiros = useState( 0 );
  // let contador = listaPonteiros[0];
  // let setContador = listaPonteiros[1];
  // console.log("Lista de ponteiros: ", listaPonteiros);

  // const lista = ["a", "b", "c"];
  // const textoA = lista[0];
  // const textoB = lista[1];
  // const textoC = lista[2];
  // const [textoA, textoB, textoC] = lista;

  
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 48}}>Contador</Text>
      <StatusBar style="auto" hidden={false} animated={false}
            backgroundColor="#FFFF0099"
            translucent={true}/>
      <Contador/>
      <Contador/>
      <Text style={{fontSize: 60}}>Soma: {40}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
