import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';

interface Contato { 
  nome : string;
  telefone : string;
  email : string;
}

function useThema( temaPadrao : string | null | undefined) { 
  const [thema, setThema] = useState( temaPadrao );

  const foreground = thema == "light" ? "black" : "white";
  const background = thema == "light" ? "white" : "black";

  return { thema, setThema, foreground, background };

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
  const colorScheme = useColorScheme();
  const {campos, atualizarCampo, salvar} = useFormulario();
  const {setThema, foreground, background} = useThema(colorScheme);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      color : foreground,
      backgroundColor: background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    font: { 
      color : foreground,
      fontSize : 14
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.font}>Nome: </Text>
      <TextInput value={campos.nome} onChangeText={
        (texto : string) => atualizarCampo( "nome", texto)
      }/>
      <Text style={styles.font}>Telefone: </Text>
      <TextInput value={campos.telefone} onChangeText={
        (texto : string) => atualizarCampo( "telefone", texto)
      }/>
      <Text style={styles.font}>Email: </Text>
      <TextInput value={campos.email} onChangeText={
        (texto : string) => atualizarCampo( "email", texto)
      }/>
      <Button title="Salvar" onPress={salvar}/>
      <Button title="Light" onPress={()=>setThema("light")}/>
      <Button title="Dark" onPress={()=>setThema("dark")}/>

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


