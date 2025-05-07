import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

interface Contato { 
  nome : string
  telefone : string
  email : string
}

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [lista, setLista] = useState<Contato[]>([]);
  return (
    <View style={styles.container}>
      <Text style={{marginVertical: 20, fontSize: 32}}>Contatos</Text>
      <StatusBar style="auto" />
      <TextInput placeholder="Nome Completo:"
        value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Telefone com DDD:"
        value={telefone} onChangeText={setTelefone}/>
      <TextInput placeholder="Email Valido:"
        value={email} onChangeText={setEmail}/>
      <Button title="Gravar" onPress={()=>{
        axios.post(
          "https://tdsr-329ac-default-rtdb.firebaseio.com/contatos.json",
          {
            nome,
            telefone,
            email
          }
        )
        .then(()=>{
          Alert.alert("Gravacao", "Contato gravado com sucesso");
        })
        .catch(( err : any )=>{
          Alert.alert("Erro", "Erro ao gravar o contato " + err);
        })
      }}/>

      <Button title="Carregar" onPress={()=>{
        axios.get("https://tdsr-329ac-default-rtdb.firebaseio.com/contatos.json")
        .then(( info : AxiosResponse<any, any> )=>{
          const listaTemp : Contato[] = [];
          for (const chave in info.data) { 
            const contato = info.data[chave];
            listaTemp.push( contato );
          }
          setLista(listaTemp);
          Alert.alert("Contatos", `Foram lidos ${listaTemp.length} contatos`);
        })
        .catch(( err : any )=>{
          Alert.alert("Erro", "Erro ao ler os contatos da base " + err);
        })
      }}/>

      <FlatList data={lista} renderItem={( itemProps : any )=>{
        return (
          <View style={{backgroundColor: "lightyellow", margin: 20, padding: 10, 
            borderColor: "red", borderWidth: 1, borderRadius: 16
          }}>
            <Text>Nome: {itemProps.item.nome}</Text>
            <Text>Telefone: {itemProps.item.nome}</Text>
            <Text>Email: {itemProps.item.nome}</Text>
          </View>
        )
      }}/>
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
