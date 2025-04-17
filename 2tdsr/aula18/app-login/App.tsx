import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Profile { 
  usuario : string
  senha : string
}

export default function App() {
  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>( null );
  const [logado, setLogado] = useState<boolean>(false);
  let label = "Registro"

  useEffect(()=>{
    AsyncStorage.getItem("PROFILE")
    .then(( valor : string | null)=>{
      if (valor != null) { 
        const obj = JSON.parse( valor );
        label = "Login"
        setProfile(obj);
      }
    })
    .catch(()=>{
      Alert.alert("Não foi possivel buscar dados da aplicação");
    })
  }, [])
  

  return (
    logado ? 
    (<View style={styles.container}>
      <Text>Area restrita</Text>
      <Button title="Logout" onPress={()=>{
        AsyncStorage.removeItem("PROFILE")
        .then(()=>{
          Alert.alert("Usuario deslogado com sucesso");
          setProfile( null );
          setLogado(false);
        })
        .catch((erro)=>{
          Alert.alert("Erro ao deslogar");
        })
      }}/>
    </View>)
    :
    (<View style={styles.container}>
      <Text>{label} de usuario</Text>
      <TextInput placeholder="Email: "
        value={usuario} onChangeText={setUsuario} />
      <TextInput placeholder="Senha: " secureTextEntry={true}
        value={senha} onChangeText={setSenha} />
      { profile == null ?
        <Button title="Registrar-se" onPress={()=>{
          const obj : Profile = {usuario, senha};
          AsyncStorage.setItem("PROFILE", JSON.stringify(obj))
          .then(()=>{
            setProfile(obj);
          })
          .catch((erro)=>{
            Alert.alert("Erro ao fazer o registro");
          })
        }}/> : 
        <Button title="Logar" onPress={()=>{
          if (usuario === profile.usuario && senha === profile.senha) { 
            setLogado(true);
          } else { 
            Alert.alert("Usuario ou senha incorretos");
          }
        }}/>
      }
      <StatusBar style="auto" />
    </View>)
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
