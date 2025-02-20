import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// const textoEstilo = {fontSize : 28};
// const container = {flex: 1, backgroundColor: "lightcyan"} 

const estilos = StyleSheet.create({
  texto : {fontSize: 26, fontWeight: "bold"},
  container : {flex: 1, backgroundColor: "lightcyan"}
})

function AgendaContatoFormulario() { 
  return (
    <View style={estilos.container}> 
      <Text style={estilos.texto}>Nome: </Text>
      <TextInput/>
      <Text style={estilos.texto}>Telefone: </Text>
      <TextInput/>
      <Text style={estilos.texto}>Email: </Text>
      <TextInput/>
      <Button title="Gravar"/>
      <Button title="Pesquisar"/>
    </View>
  )
}

export default AgendaContatoFormulario;