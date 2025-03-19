import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


export default function App() {
  const [nome, setNome] = useState("");
  return (
    <View style={{flex: 1, 
        justifyContent: "space-around",
        padding: 50,
        alignItems: "center"}}>
      <Text style={{fontSize: 48}}>Agenda de Contato</Text>
      <Text>Nome Completo: </Text>
      <TextInput style={{backgroundColor: "lightcyan",
        borderColor: "red",
        borderWidth: 1

      }} value={nome} 
      onChangeText={ ( textoDigitado : string )=>{
        setNome(textoDigitado);
      }}/>
    </View>
  );
}