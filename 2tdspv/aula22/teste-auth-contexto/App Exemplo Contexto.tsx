import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState, createContext, useContext} from 'react';  

const valorPadrao = {
  email: ""
} 

const Contexto = createContext(valorPadrao);

const SubFormulario = () => {
  const valor = useContext( Contexto ); 
  return (
    <Text>Subformulario: {valor.email}</Text>
  )
}

const Formulario = () => {
  const valor = useContext( Contexto ); 
  return ( 
    <View>
      <Text>Formulario principal</Text>
      <SubFormulario/>
    </View>
  )
}


export default function App() {
  const [email, setEmail] = useState<string>("");
  const objValor = {email}
  return (
    <Contexto.Provider value={ objValor }>
      <View style={styles.container}>
        <Text>Teste de Contexto</Text>
        <TextInput value={email} onChangeText={setEmail}
          placeholder="Email valido"/>
        <Formulario />
        <StatusBar style="auto" />
      </View>
    </Contexto.Provider>
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
