import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useState } from 'react';

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin : AxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts"
})

export default function App() {
  const [email, setEmail] = useState<string>("maria@teste.com");
  const [password, setPassword] = useState<string>("abc123");
  const [token, setToken] = useState<string|undefined>(undefined);
  const KEY_SUFIX = `key=${APIKEY}`;
  return (
    <View style={styles.container}>
      { token ?  (<View>
        <Text>Aplicação acessada com sucesso</Text>
        <Text>Você esta logado</Text>
        <Text>Token: {token}</Text>
        <Button title="Logout" onPress={()=>{
          setToken(undefined);
        }}/>
      </View>) : (
      <View>
        <Text>Acesso ao aplicativo</Text>
        <TextInput value={email} onChangeText={setEmail}
          placeholder="Email valido:"/>
        <TextInput value={password} onChangeText={setPassword}
          placeholder="Senha segura:" secureTextEntry={true}/>

        <Button title="Registrar" onPress={()=>{
          const path = `:signUp?${KEY_SUFIX}`;
          console.log(`Acessando : ${path}`);
          apiLogin.post(path,
            {
              email, password, returnSecureToken: true
            }
          )
          .then((info : AxiosResponse)=>{
            setToken(info.data.idToken);
            ToastAndroid.show(`Usuario registrado com sucesso`,
              ToastAndroid.LONG);
          })
          .catch((err : any)=>{ 
              const strErr = JSON.stringify(err);
              console.log(strErr);
              ToastAndroid.show(`Erro ao registrar o usuario`,
              ToastAndroid.LONG);
          })
        }}/>
        <Button title="Logar" onPress={()=>{
          const path = `:signInWithPassword?${KEY_SUFIX}`;
          console.log(`Acessando : ${path}`);
          apiLogin.post(path,
            {
              email, password, returnSecureToken: true
            }
          )
          .then(( info : AxiosResponse )=>{
            setToken(info.data.idToken);
            ToastAndroid.show(`Usuario logado com sucesso`,
              ToastAndroid.LONG);
          })
          .catch((err : any)=>{ 
              const strErr = JSON.stringify(err);
              console.log(strErr);
              ToastAndroid.show(`Erro ao logar o usuario`,
              ToastAndroid.LONG);
          })
        }}/>
    </View>
  )}
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
