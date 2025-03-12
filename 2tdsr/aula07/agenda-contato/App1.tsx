import React from 'react';
import {Alert, Text, View, Button} from "react-native";
function meAperte() { 
  // Alert.alert("Botão Apertado");
  alert("Botão Apertado");
}
export default () => { 
  return (
    <View>
      <Text>Aperte o botão abaixo</Text>
      {/* <Button title="Me aperte" onPress={meAperte} /> */}
      <Button title="Me aperte" onPress={()=>alert("Botao apertado")}/>
    </View>
  )
}