import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContadorProps {
  valorInicial : number
  onMudar : ( valor : number ) => void 
}
const Contador = ( props : ContadorProps ) => { 
  const [valor, setValor] = useState<number>( props.valorInicial );
  return (
    <View>
      <Button title=" - " onPress={()=>{
        setValor((valorAntigo : number) : number => {
          const valorNovo = valorAntigo - 1;
          props.onMudar( valorNovo );
          return valorNovo;
        });
      }}/> 
      <Text>Contador: {valor}</Text>
      <Button title=" + " onPress={()=>{
        const valorNovo = valor + 1;
        setValor( valorNovo );
        props.onMudar( valorNovo );
      }}/>
    </View>
  )
}


export default function App() {
  const [nome, setNome] = useState<string>("");
  const lista = [true, 25, 43, 32, "Ticket", {"nome" : "Maria", "tel": 
    "9999-9999"}]
  
  // "Maria"  + "J"  => "MariaJ"  
  return (
    <View style={styles.container}> 
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput placeholder="Digite seu nome" 
          value={nome} onChangeText={( texto : string)=>{
            setNome( texto )
          }}/>
      <Contador valorInicial={ 10 }
            onMudar={( valorAtual : number )=>{ 
              console.log(valorAtual);  
            }}/>
      <Button title="Gravar Dados" onPress={()=>{
        // const promessa = AsyncStorage.setItem( "nome_completo", nome )
        // promessa.then(()=>{
        //   console.log("Gravado com sucesso");
        // })
        // promessa.catch(()=>{
        //   console.log("Erro ao gravar");
        // })
        AsyncStorage.setItem( "nome_completo", nome )
        .then(()=>{
          console.log("Gravado com sucesso");
        })
        .catch(()=>{
          console.log("Erro ao gravar");
        })
      }}/>

      <Button title="Ler Dados" onPress={()=>{
        AsyncStorage.getItem("nome_completo")
        .then(( dados : string | null )=>{
          setNome( dados || "" )
        })
        .catch(( err : any )=>{
          console.log("Erro ao ler dados: ", err);
        })
      }}/>

      <Button title="Gravar dados complexos" onPress={()=>{
        AsyncStorage.setItem( "dados_complexos", JSON.stringify(lista) )
        .then(()=>{
          console.log("Dados complexos gravados com sucesso");
        })
        .catch(( err )=>{
          console.log("Erro ao gravar dados complexos: ", err);
        })
      }}/>
      <Button title="Ler dados complexos" onPress={()=>{
        AsyncStorage.getItem("dados_complexos")
        .then(( dados : string | null )=>{
          console.log("Dados lidos: ", dados);
          const listaLida = JSON.parse( dados || "" );
          console.log("Lista lida: ", listaLida);
          console.log("Lista lida [3]: ", listaLida[3]);
        })
        .catch(( err )=>{
          console.log("Erro ao ler dados complexos: ", err);
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
