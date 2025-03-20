import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';


function Contador( props : any ) {
  
  return (
    <View style={{flexDirection: "row"}}>
        <Button title="-" onPress={()=>{
          props.setValor( props.valor - 1 );
          console.log("Contador: ", props.valor);
        }} />
        <Text style={{fontSize: 60}}> {props.valor} </Text>
        <Button title="+" onPress={()=>{
          props.setValor( props.valor + 1 );
          console.log("Contador: ", props.valor);
        }}/>
      </View>
  )
} 


export default function App() { 
  const [contador1, setContador1] = useState( 10 );
  const [contador2, setContador2] = useState( 10 );
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 48}}>Contador</Text>
      <StatusBar style="auto" hidden={false} animated={false}
            backgroundColor="#FFFF0099"
            translucent={true}/>
      <Contador valor={contador1} setValor={setContador1}/>
      <Contador valor={contador2} setValor={setContador2}/>
      <Text style={{fontSize: 60}}>Soma: {contador1 + contador2}</Text>
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
