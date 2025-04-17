import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

interface Contato { 
  nome : string
  telefone : string
  email : string
}

const c1 : Contato = {nome: "Joao Silva", telefone : "11111", email: "joao@teste.com"}
const c2 : Contato = {nome: "Maria Silva", telefone : "22222", email: "maria@teste.com"}

export default function App() {
  const [texto, setTexto] = useState<string>("");
  const [chave, setChave] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text>Teste de Async Storage</Text>
      <TextInput placeholder="Digite um texto" 
        value={texto} onChangeText={setTexto}/>

      <Button title="Gravar Texto" onPress={()=>{
        // // Retorna uma Promise
        // const promessa = AsyncStorage.setItem("TEXTO", texto); 
        // promessa.then(()=>{})
        // promessa.catch(()=>{})

        AsyncStorage.setItem("TEXTO", texto)
        .then(()=>{
          Alert.alert("Texto gravado com sucesso");
        })
        .catch(()=>{
          Alert.alert("Erro ao gravar o texto");
        })
      }}/>

      <Button title="Ler Texto" onPress={()=>{
        AsyncStorage.getItem("TEXTO")
        .then(( valor : string | null )=>{
          setTexto( valor || "" );
        })
        .catch(( err : any )=>{
          Alert.alert( "Erro: " + err)
        })
      }}/>

      <Button title="Gravar Objeto" onPress={()=>{
        const textoJsonC1 = JSON.stringify(c1);
        AsyncStorage.setItem("CONTATO1", textoJsonC1)
        .then(()=>{
          Alert.alert(`Objeto contato (${c1.nome}) gravado com sucesso`);
        })
        .catch(( erro )=>{
          Alert.alert(`Erro: ${erro} ao gravar o contato (${c1.nome})`);
        })
      }}/>
      <Button title="Ler Objeto" onPress={()=>{
        AsyncStorage.getItem("CONTATO1")
        .then(( texto : string | null )=>{
          const objContato1 : Contato = JSON.parse( texto || "{}" );
          Alert.alert("Contato lido: " + objContato1.nome + 
                      "\nTelefone: " + objContato1.telefone);
        })
        .catch(( erro ) => {
          Alert.alert(`Erro: ${erro} ao ler o contato`);
        })
      }}/>
      <Button title="Ler Todas Chaves" onPress={()=>{
        AsyncStorage.getAllKeys()
        .then( (nomeChaves : readonly string[])=>{
          Alert.alert("Chaves Lidas: " + JSON.stringify(nomeChaves));
        })
        .catch (( erro ) => {
          Alert.alert(`Erro: ${erro} ao ler as chaves`);
        })
      }}/>
      <TextInput placeholder="Nome da chave"
        value={chave} onChangeText={setChave}/>
      <Button title="Remover chave" onPress={()=>{
        AsyncStorage.removeItem( chave )
        .then(()=>{
          Alert.alert(`Chave ${chave} removida com sucesso`) 
        })
        .catch(( erro ) => {
          Alert.alert(`Erro: ${erro} ao remover a chave`);
        })
      }}/>
      <Button title="Limpar Tudo" onPress={()=>{
        AsyncStorage.clear()
        .then(()=>{
          Alert.alert(`Armazenamento Storage Limpo com sucesso`) 
        })
        .catch(( erro ) => {
          Alert.alert(`Erro: ${erro} ao limpar o armazenamento`);
        })
      }}/>
      <StatusBar style="auto" />
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
