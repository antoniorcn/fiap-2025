import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import React, {useState} from 'react';  
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const APIKEY=process.env.EXPO_PUBLIC_APIKEY

const apiLogin : AxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts"
})

interface FormularioLoginProps {
  onLogar : (email : string, senha : string) => void
  onRegistrar : (email : string, senha : string) => void
}

const FormularioLogin = (props : FormularioLoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  return ( 
    <View>
      <Text>Digite suas credenciais</Text>
      <TextInput value={email} onChangeText={setEmail}
        placeholder="Email valido"/>
      <TextInput value={senha} onChangeText={setSenha}
        placeholder="Senha" secureTextEntry={true}/>
      <Button title="Registrar" onPress={()=>{
        console.log("Registrando pressionado");
        props.onRegistrar( email, senha)
      }}/>
      <Button title="Logar" onPress={()=>{
        props.onLogar( email, senha)
      }}/>
    </View>
  )
}


export default function App() {

  const [token, setToken] = useState<string | undefined>();

  const logar = (email : string, senha : string) => { 
    apiLogin.post(`:signInWithPassword?key=${APIKEY}`, 
      { 
        email: email,
        password: senha,
        returnSecureToken: true
       })
    .then(( info : AxiosResponse<any, any>)=>{
      setToken(info.data.idToken)
      ToastAndroid.show("Usuario foi autenticado com sucesso", ToastAndroid.LONG);
    })
    .catch(( err : any )=>{
      setToken(undefined)
      ToastAndroid.show( `Erro ${err} ao logar o usuário`, ToastAndroid.LONG);
    })
  }


  const registrar = (email : string, senha : string) => { 
    apiLogin.post(`:signUp?key=${APIKEY}`, 
      { 
        email: email,
        password: senha,
        returnSecureToken: true
       })
    .then(( info : AxiosResponse<any, any>)=>{
      setToken(info.data.idToken)
      ToastAndroid.show("Usuario foi registrado com sucesso", ToastAndroid.LONG);
    })
    .catch(( err : any )=>{
      setToken(undefined)
      ToastAndroid.show( `Erro ${err} ao registrar o usuário`, ToastAndroid.LONG);
    })
  }

  return (
    <View style={styles.container}>
      <Text>Autenticação</Text>
      { !token ? 
        (
          <FormularioLogin onLogar={logar} onRegistrar={registrar}/>
        ) :
        (  
          <View>
            <Text>Componente Principal ... </Text>
            <Button title="Logout"  onPress={()=>{
              setToken( undefined )
            }}/>
          </View>
        )
      }
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
