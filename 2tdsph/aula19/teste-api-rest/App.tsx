import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Contato { 
  nome : string
  telefone : string
  email : string
}


const ContatoItem = 
  ( props : ListRenderItemInfo<Contato> ) : React.ReactElement => {
  return (
    <View style={{
      backgroundColor: "lightyellow",
      margin: 10,
      padding: 10,
      borderColor: "red",
      borderRadius: 16
    }}>
      <Text>Nome: {props.item.nome}</Text>
      <Text>Telefone: {props.item.telefone}</Text>
      <Text>Email: {props.item.email}</Text>
    </View>
  )
}

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [lista, setLista] = useState<Contato[]>([]);
  return (
    <View style={styles.container}>
      <Text>Teste de API Rest</Text>
      <View>
        <TextInput placeholder="Nome Completo:" value={nome} onChangeText={setNome}/>
        <TextInput placeholder="Telefone com DDD:" value={telefone} onChangeText={setTelefone}/>
        <TextInput placeholder="Email Valido:" value={email} onChangeText={setEmail}/>
      </View>
      <StatusBar style="auto" />
      <Button title="Gravar" onPress={()=>{
        axios.post(
          "https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json",
          {
            nome,
            telefone,
            email
          }
        )
        .then(()=>{
          ToastAndroid.show("Contato gravado com sucesso", 
            ToastAndroid.LONG);
        })
        .catch(( err )=>{
          ToastAndroid.show("Erro ao gravar o contato " + err, 
            ToastAndroid.LONG);
        })
      }}/>
      <Button title="Ler Contatos" onPress={()=>{
        axios.get(
          "https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json"
        )
        .then(( info : AxiosResponse<any, any>)=>{
          console.log("Dados : ", info.data);

          const tempList : Contato[] = [];
          for (const chave in info.data) { 
            const contato = info.data[chave];
            tempList.push( contato );
          }
          ToastAndroid.show(`Foram lidos ${tempList.length} contatos`, 
            ToastAndroid.LONG);
          setLista( tempList );
        })
        .catch(( err )=>{
          ToastAndroid.show("Erro ao ler os contatos " + err, 
            ToastAndroid.LONG);
        })
      }}/>
      <FlatList data={lista} renderItem={ContatoItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
