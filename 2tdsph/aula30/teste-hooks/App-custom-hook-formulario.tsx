import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface Contato { 
  nome : string;
  telefone : string;
  email : string;
}

function useFormulario() { 
  const [campos, setCampos] = useState<Contato>(
    {nome: "", telefone: "", email: "" });
  const [lista, setLista] = useState<Array<Contato>>( [] );

  const atualizarCampo = (nomeCampo : string, texto : string) => { 
    const obj : Contato = { ...campos };
    obj[nomeCampo as keyof Contato] = texto;
    setCampos( obj );
  }

  const salvar = () => {
    const novaLista = [...lista, campos];
    setLista(novaLista);
  }

  return {campos, atualizarCampo, salvar};
}

export default function App() {
  const {campos, atualizarCampo, salvar} = useFormulario();

  return (
    <View style={styles.container}>
      <Text>Nome: </Text>
      <TextInput value={campos.nome} onChangeText={
        (texto : string) => atualizarCampo( "nome", texto)
      }/>
      <Text>Telefone: </Text>
      <TextInput value={campos.telefone} onChangeText={
        (texto : string) => atualizarCampo( "telefone", texto)
      }/>
      <Text>Email: </Text>
      <TextInput value={campos.email} onChangeText={
        (texto : string) => atualizarCampo( "email", texto)
      }/>
      <Button title="Salvar" onPress={salvar}/>
      <StatusBar style="auto" />
    </View>
  );
}

// function useFormulario() {
//   const [nome, setNome] = useState<string>("");
//   const [telefone, setTelefone] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [lista, setLista] = useState<any[]>([]);
//   const salvar = () => {
//     const novaLista = [ ...lista, {nome, telefone, email} ];
//     setLista(novaLista);
//   }
//   return {nome, setNome, telefone, setTelefone, 
//     email, setEmail, salvar, lista};
// }

// export default function App() {
//   const {nome, setNome, telefone, setTelefone, 
//     email, setEmail, salvar, lista} = useFormulario();
//   return (
//     <View style={styles.container}>
//       <Text>Nome: </Text>
//       <TextInput value={nome} onChangeText={setNome}/>
//       <Text>Telefone: </Text>
//       <TextInput value={telefone} onChangeText={setTelefone}/>
//       <Text>Email: </Text>
//       <TextInput value={email} onChangeText={setEmail}/>
//       <Button title="Salvar" onPress={salvar}/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
