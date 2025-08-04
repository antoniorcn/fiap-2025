import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function useMeuHook() {
  const [valor, setValor] = useState<number>(0);
  const [nome, setNome] = useState<string>("");
  const incrementar = () => {
    setValor( (valorAntigo : number) => valorAntigo + 1);
    return () => { 
      console.log("Componente Destruido");
    }
  }
  useEffect( incrementar, [ nome ] );
  // return [valor];
  return {valor: valor, incrementar: incrementar, 
          nome, setNome}
}

export default function App() {
  // const [meuValor] = useMeuHook();
  const {valor, incrementar, nome, setNome} = useMeuHook();
  return (
    <View style={styles.container}>
      <Text> Componente atualizado </Text>
      <Text> {valor} </Text>
      <TextInput value={nome} onChangeText={setNome}/>
      <Button title="+" onPress={incrementar}/>
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
