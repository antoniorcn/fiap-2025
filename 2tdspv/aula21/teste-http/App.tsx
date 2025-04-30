import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TextInput, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Contato { 
  id : string
  nome : string
  telefone : string
  email : string
}
const ContatoItem = ( props : ListRenderItemInfo<Contato>) => { 
  return ( 
    <View>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
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
      <Text>Formulario de Contatos</Text>
      <StatusBar style="auto" />
      <TextInput placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <Button title="Gravar" onPress={()=>{
        axios.post("https://tdspv-a8c0e-default-rtdb.firebaseio.com/contatos.json", 
          { nome, telefone, email }
        )
        .then(()=>{
          Alert.alert("Contato cadastrado");
        })
        .catch(()=>{
          Alert.alert("Erro ao gravar o contato");
        })
      }} />

      <Button title="Carregar" onPress={()=>{
        axios.get("https://tdspv-a8c0e-default-rtdb.firebaseio.com/contatos.json")
        .then((info : AxiosResponse<any, any>)=>{
          const listaTemp : Contato[] = [];
          for (const chave in info.data) { 
            const c = info.data[chave];
            const contato : Contato = { id: chave, ...c };
            listaTemp.push(contato);
          }
          setLista( listaTemp );
        })
        .catch(()=>{})
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
