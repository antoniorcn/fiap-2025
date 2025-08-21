import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { object, string } from 'yup';

const contatoSchema = object({
  nome : string().min(5, "Por favor digite um nome com pelo menos 5 caracteres"),
  email : string().required().email("Por favor digite um email valido")
});

export default function App() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [erroNome, setErroNome] = useState<string>("");
  const [erroEmail, setErroEmail] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [sucesso, setSucesso] = useState<boolean>(true);
  return (
    <View style={styles.container}>
      <Text>Teste de Validação</Text>
      <Text>Nome Completo: </Text>
      <TextInput value={nome} onChangeText={setNome}/>
      <Text style={{color: 'red'}}>{erroNome}</Text>
      <Text>Email: </Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Text style={{color: 'red'}}>{erroEmail}</Text>      
      <Button title="Validar" onPress={()=>{
        const objContato = {nome, email};
        setErroNome("");
        setErroEmail("");
        setMensagem("");
        contatoSchema.validate(objContato, {abortEarly: false})
        .then(()=>{
          setMensagem("Contato validado com sucesso")
          setSucesso(true);
        })
        .catch((error)=>{
          let msgErros = error.message;
          for (const e of error.inner) { 
            // msgErros += e.message + "\n";
            if (e.path == "nome") { 
              setErroNome( e.message );
            } else if (e.path == "email") { 
              setErroEmail( e.message );
            }
          }
          // setMensagem(msgErros);
          setSucesso(false);
        })
      }}/>
      <Text style={{fontSize: 24, fontWeight: "bold",
        color: sucesso ? "green" : "red"
      }}>{mensagem}</Text>
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
