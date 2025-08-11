import { useState  } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

function useIncrementador() {
  const [numero, setNumero] = useState<number>(0);
  const funcaoAtualizar = ( numeroAntigo : number ) => {
    const novoNumero = numeroAntigo + 1;
    console.log("Numero: ", novoNumero);
    return novoNumero; 
  };
  const incrementar = () => {
    setNumero(funcaoAtualizar);
  }
  return [numero, incrementar];
}


export default function App() {
  const [quantidade, incrementarQuantidade] = useIncrementador();
  const [conexoes, incrementarConexoes] = useIncrementador();
  return (
    <View style={styles.container}>
      <Text>Quantidade: {quantidade}</Text>
      <Button title="Incrementar" onPress={incrementarQuantidade}/>
      <Text>Conexoes: {conexoes}</Text>
      <Button title="Incrementar" onPress={incrementarConexoes}/>      
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
