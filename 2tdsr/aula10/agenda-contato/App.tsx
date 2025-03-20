import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


export default function App() { 
  const [nome, setNome] = useState( "" );
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32}}>Agenda de Contato</Text>
      <StatusBar style="auto" hidden={false} animated={false}
            backgroundColor="#FFFF0099"
            translucent={true}/>
      <View style ={{alignSelf: "stretch", padding: 20}}>
        <Text>Nome Completo: </Text>
        <TextInput style={{backgroundColor: "lightcyan",
                              borderWidth: 1,
                              borderColor: "red",
                              borderRadius: 16,
                              padding: 10,
                              margin: 10
                          }}
                  value = { nome }
                  onChangeText = { ( textoDigitado ) => {

                    setNome(textoDigitado
                      .toLowerCase()
                      .replace("a", "4")
                      .replace("o", "0")
                      .replace("s", "5"));
                    // console.log( textoDigitado );
                  } } 
         />
      </View>
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
