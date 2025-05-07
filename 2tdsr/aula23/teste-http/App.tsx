import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Gravar" onPress={()=>{
        axios.post(
          "https://tdsr-329ac-default-rtdb.firebaseio.com/contatos.json",
          {
            "nome": "Maria Silva",
            "telefone": "(11) 1111-1111",
            "email": "maria@teste.com"
          }
        )
        .then(()=>{
          Alert.alert("Gravacao", "Contato gravado com sucesso");
        })
        .catch(( err : any )=>{
          Alert.alert("Erro", "Erro ao gravar o contato " + err);
        })
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
