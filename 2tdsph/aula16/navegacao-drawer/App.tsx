import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  // let a = 10;

  // Async Storage grava ai ==> a 
  // Promisse
  // Se der certo faça ==> codigo a ser feito se der certo
  // Se der errado faça ==> codigo a ser feito se der errado
  // Promisse

  // console.log("Este comando vai rodar antes do async storage fazer a gravação")

  const numeros : number[] = [10, 20, 30, 40, 50];
  
  const [chave, setChave] = useState<string>("");
  const [valor, setValor] = useState<string>("");

  return (
      <View style={styles.container}>
        <Text>Async Storage</Text>
        <Text>Chave: </Text>
        <TextInput value={chave} onChangeText={setChave}
              placeholder="Informe a chave" />
        <Text>Valor: </Text>
        <TextInput value={valor} onChangeText={setValor} 
              placeholder="Informe o valor"/>
        <Button title="Gravar Lista Numeros" onPress={()=>{
          const textoNumeros = JSON.stringify(numeros);
          console.log("Texto numeros: ", textoNumeros);
          AsyncStorage.setItem("NUMEROS", textoNumeros);
        }}/>
        <Button title="Ler Lista Numeros" onPress={()=>{
          AsyncStorage.getItem("NUMEROS")
          .then ((textoNumeros : string | null)=>{
            const listaDeVerdade = JSON.parse(textoNumeros ? textoNumeros: "[]");
            for (let numero of listaDeVerdade) { 
              console.log("Numero: ", numero);
            }
          })
        }}/>
        <Button title="Gravar" onPress={() => {

          // const promessa = AsyncStorage.setItem(chave, valor)
          // promessa
          //   .then(() => { console.log("Deu certo"); })
          //   .catch(() => { console.log("Deu errado"); })
          console.log("Botao gravar apertado");
          AsyncStorage.setItem(chave, valor)
          .then(() => { console.log("Deu certo"); })
          .catch(() => { console.log("Deu errado"); });

          console.log("Este comando vai rodar antes do async storage fazer a gravação");

        }}/> 
        <Button title="Ler" onPress={() => {
          console.log("Botao ler apertado");

          AsyncStorage.getItem(chave)
          .then( (value : string | null)=>{ 
            ToastAndroid.show(`Deu certo foi lido o valor: ${value} `, ToastAndroid.LONG); 
          })
          .catch(()=>{ ToastAndroid.show("Deu errado", ToastAndroid.LONG); });
          console.log("Este comando vai rodar antes do async storage fazer a leitura");
        }}/>
        <StatusBar style="auto" />
      </View>
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
