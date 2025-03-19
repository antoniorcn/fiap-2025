import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


function Contador (props : any ){
  // const lista = useState( 10 );   // Retorna dois valores  [  consultar o valor,    função para alterar o valor  ] 
  // const contador = lista[0];
  // const setContador = lista[1];

  const [contador, setContador] = useState( 0 );
  // const [textoA, textoB, textoC] = ["a", "b", "c"];

  console.log("Componente criado ... ");

  console.log("Atualizando a tela ... ");
  return (
    <View style={{flexDirection: "row", 
    justifyContent: "center",
    alignSelf: "stretch"}}>
      <Button title= " - " onPress={()=>{
        setContador( contador - 1 );
        // console.log("Contador: ", this.state.contador);
      }}/>
      <Text style={{fontSize: 64}}> {contador} </Text>
      <Button title= " + " onPress={()=>{
        setContador( contador + 1 );
        // console.log("Contador: ", this.state.contador);
      }}/>
    </View>
  )
}




export default function App() {
  return (
    <View style={{flex: 1, 
        justifyContent: "space-around",
        padding: 50,
        alignItems: "center"}}>
      <Text style={{fontSize: 48}}>Contador</Text>
      <Contador/>
    </View>
  );
}