import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import yup, { ValidationError,  object, string } from 'yup';


const contatoSchema = object({
  nome : string()
  .required("Informe o nome completo")
  .min(5, "O nome precisa ter no minimo 5 caracteres"),
  email : string()
  .required("Por favor informe um email para o cadastro")
  .email("É preciso informar um email válido")
})

type Contato = yup.InferType<typeof contatoSchema>

export default function App() {
  const [contato, setContato] = useState<Contato>({
    nome: "", email: ""
  });

  const handler = (texto : string, nomeCampo : string) => { 
    const novoContato = {...contato};
    novoContato[nomeCampo as keyof typeof novoContato] = texto;
    setContato( novoContato );
  }

  interface ContatoErros { 
    nome? : string
    email? : string
  }

  const [contatoErros, setContatoErros] = useState<ContatoErros>({});

  const validar = () => { 
    setContatoErros({});
    contatoSchema.validate(contato, {abortEarly: false})
    .then(()=>{
      Alert.alert("Dados validados com sucesso");
    })
    .catch((errors)=>{
      const objErros : ContatoErros = {};
      errors.inner.forEach( ( erro: ValidationError)=>{
        objErros[erro.path as keyof typeof objErros] = erro.message
      })
      setContatoErros(objErros);
    })

  }

  return (
    <View style={styles.container}>
      <Text>Teste de Validação</Text>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput value={contato.nome} onChangeText={(txt : string)=>handler(txt, "nome")}/>
        <Text style={styles.erro}>{contatoErros.nome}</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput value={contato.email} onChangeText={(txt : string)=>handler(txt, "email")}/>
        <Text style={styles.erro}>{contatoErros.email}</Text>
        <Button title="Validar" onPress={validar}/>
      </View>
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
  label: {
    color: "black",
    fontSize: 16
  },
  erro : { 
    color: "red",
    fontSize: 12,
    fontWeight: "bold"
  }
});
