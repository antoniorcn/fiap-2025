import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [nome, setNome] = useState("");

  return (
    <View style={{flex: 1, backgroundColor: "lightyellow", 
                  justifyContent: "center"}}>
      <Text style={estilos.label}>Nome Completo: </Text>
      <TextInput style={estilos.input} value={nome}
        onChangeText={( novoTexto : string )=>{ 
          const textoAtualizado = novoTexto
            .replace("a", "4")
            .replace("o", "0")
            .replace("s", "5")
            .replace("b", "8");
          setNome(textoAtualizado);
        }}
      />
      <Text style={estilos.label}>Email: </Text>
      <TextInput style={estilos.input}/>
      <Text style={estilos.label}>Telefone: </Text>
      <TextInput style={estilos.input}/>
      <Button title="Gravar" onPress={()=>{

      }}/>
    </View>
  );
}

const estilos = StyleSheet.create({
  label: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 14,
  },
  input: { 
    backgroundColor: "lightcyan",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    margin: 5
  }
})