import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [lista, setLista] = useState<any[]>([]);
  return (
    <View style={styles.container}>
      <TextInput value={nome} onChangeText={setNome} placeholder ="Nome" />
      <TextInput value={telefone} onChangeText={setTelefone} placeholder ="Telefone" />

      <Button title="Carregar" onPress={()=>{
        axios.get("https://tdsr-329ac-default-rtdb.firebaseio.com/contatos.json")
        .then(( info : AxiosResponse<any, any> )=>{
          const tempLista : any[] = [];
          for (const chave in info.data) { 
            const obj = info.data[chave];
            obj.id = chave;
            tempLista.push( obj );
          }
          setLista(tempLista);
        })
        .catch(( err : any)=>{
          ToastAndroid.show("Erro ao ler os dados de contato: " + err, ToastAndroid.LONG);
        })
      }}/>

      <Button title="Gravar" onPress={()=>{
        axios.post("https://tdsr-329ac-default-rtdb.firebaseio.com/contatos.json",
          { nome, telefone }
        )
        .then(()=>{
          ToastAndroid.show("Contato gravado", ToastAndroid.LONG);
        })
        .catch(( err : any)=>{
          ToastAndroid.show("Erro ao gravar o contato: " + err, ToastAndroid.LONG);
        })
      }}/>

      <FlatList data={lista} renderItem={(renderProps)=><View>
        <Text>Nome: {renderProps.item.nome}</Text>
        <Text>Telefone: {renderProps.item.telefone}</Text>
        <Button title="Apagar" onPress={()=>{
           axios.delete("https://tdsr-329ac-default-rtdb.firebaseio.com/contatos/" +
           renderProps.item.id + ".json" )
         .then(()=>{
           ToastAndroid.show("Contato apagado", ToastAndroid.LONG);
         })
         .catch(( err : any)=>{
           ToastAndroid.show("Erro ao apagar o contato: " + err, ToastAndroid.LONG);
         })
        }}/>
      </View>}/>
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
