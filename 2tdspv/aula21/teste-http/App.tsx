import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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
