import { useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function useContatoFormulario() {
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [lista, setLista] = useState<any[]>([]);

  function salvar() { 
    // setLista( [...lista, {nome, telefone, email}] );
    // console.log( lista );

    setLista( ( listaAntiga : any[] )=> {
      const listaNova = [...listaAntiga, {nome, telefone, email}];
      console.log(listaNova);
      return listaNova;
    });
  }
  return {nome, setNome, 
    telefone, setTelefone, 
    email, setEmail, salvar};
}


export default function App() {
  const {
    nome, setNome, 
    telefone, setTelefone,
    email, setEmail, salvar } = useContatoFormulario();


  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput value={nome} onChangeText={setNome}/>
      <Text>Telefone:</Text>
      <TextInput value={telefone} onChangeText={setTelefone}/>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Button title="Salvar" onPress={salvar}/>      
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
