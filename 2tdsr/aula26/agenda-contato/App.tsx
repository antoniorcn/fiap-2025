import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContatoScreen } from './ContatoScreen';
import {CicloSocialScreen} from './CicloSocialScreen';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const {Screen, Navigator} = createDrawerNavigator();

const apiLogin : AxiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1"
})

const APIKEY = process.env.EXPO_PUBLIC_APIKEY;

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(undefined);
  return (
    <NavigationContainer>
      { !token ?
      (<View style={{flex: 1, justifyContent: "center"}}>
        <Text> Login </Text>
        <TextInput value={email} onChangeText={setEmail}
          placeholder="Email"/>
        <TextInput value={senha} onChangeText={setSenha}
          placeholder="Senha" secureTextEntry={true}/>
        <Button title="Registrar" onPress={()=>{
          apiLogin.post( `/accounts:signUp?key=${APIKEY}`, 
            {
                email,
                password : senha,
                returnSecureToken : true
            }
          )
          .then(( info : AxiosResponse<any, any> )=>{
            ToastAndroid.show("Usuario registrado com sucesso", ToastAndroid.LONG);
            console.log("Resposta: ", info.data);
            setToken(info.data.idToken);
          })
          .catch(( err : any )=>{
            ToastAndroid.show("Erro ao registrar o usuario", ToastAndroid.LONG);
            console.err("Erro ao registrar o usuario: ", err);
          })
        }}/>
        <Button title="Logar" onPress={()=>{
          apiLogin.post( `/accounts:signInWithPassword?key=${APIKEY}`, 
            {
                email,
                password : senha,
                returnSecureToken : true
            }
          )
          .then(( info : AxiosResponse<any, any> )=>{
            ToastAndroid.show("Usuario logado com sucesso", ToastAndroid.LONG);
            console.log("Resposta: ", info.data);
            setToken(info.data.idToken);
          })
          .catch(( err : any )=>{
            ToastAndroid.show("Erro ao logar o usuario", ToastAndroid.LONG);
            console.err("Erro ao logar o usuario: ", err);
          })
        }}/>
      </View>) :
      (<View style={styles.container}>
        <Navigator>
          <Screen name="Contato" component={ContatoScreen} />
          <Screen name="CicloSocial" component={CicloSocialScreen} />
        </Navigator>
        <Button title="Logout"  onPress={()=>{
          setToken(undefined);
        }}/>
        <StatusBar/>
      </View>)}
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
