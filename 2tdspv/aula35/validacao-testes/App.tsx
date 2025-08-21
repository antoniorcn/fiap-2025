import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, Alert } from 'react-native';
import { string, object, InferType } from 'yup';   // npm install yup

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
// const phoneRegExp = /^[119]\d{11}/
const contatoSchema = object({
  nome : string()
  .required("O nome é obrigatório")
  .min(5, "O nome deve ter pelo menos 5 caracteres"),
  email : string()
  .email("Você deve digitar um email válido")
  .required("O email é obrigatório")
  .min(6, "O email deve ter ao menos 6 caracteres"),
  telefone : string()
  .required("O telefone é obrigatório")
  .min(10, "O telefone deve ter ao menos 10 caracteres")
  .matches(phoneRegExp, "Numero de telefone inválido")
});

type Contato = InferType<typeof contatoSchema>;


export default function App() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const [erroNome, setErroNome] = useState<string>("");
  const [erroEmail, setErroEmail] = useState<string>("");
  const [erroTelefone, setErroTelefone] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text>Teste de Validação</Text>
      <Text>Nome: </Text>
      <TextInput value={nome} onChangeText={setNome}/>
      <Text style={{color: "red"}}>{erroNome}</Text>

      <Text>Telefone: </Text>
      <TextInput value={telefone} onChangeText={setTelefone}/>
      <Text style={{color: "red"}}>{erroTelefone}</Text>

      <Text>Email: </Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Text style={{color: "red"}}>{erroEmail}</Text>

      <Button title="Validação" onPress={()=>{
        const obj = { nome, email, telefone };
        setErroNome("");
        setErroEmail("");
        setErroTelefone("");
        contatoSchema.validate( obj, {abortEarly: false} )
        .then(()=>{
          Alert.alert("Validado com sucesso");
        })
        .catch(( errors )=>{
          for (const error of errors.inner) { 
            console.log(error.message);
            if (error.path == "nome") { 
              setErroNome( error.message );
            } else if (error.path == "email") { 
              setErroEmail( error.message );
            } else if (error.path == "telefone") { 
              setErroTelefone( error.message );
            }
          }

          Alert.alert("Erro ao validar: " + errors.message);
        })
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    padding: 15,
    justifyContent: 'center',
  },
});
