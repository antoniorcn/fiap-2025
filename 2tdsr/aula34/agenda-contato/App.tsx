import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';

class Fetcher { 
  gravarApiRest( texto : string ) { 
    console.log(`Camada Fetcher: Gravando ${texto} na API Rest `);
    /* Lógica para acessar a API Rest ou Async Storage*/ 
  }
}


class Servico {
  fetcher = new Fetcher();
  gravar( texto : string) { 
    console.log(`Camada Servico: Teste o valor recebido ${texto} e encaminha para ser gravado`);
    this.fetcher.gravarApiRest( texto );
  }
}


function useControl() { 
  const servico = new Servico();
  const [nome, setNome] = useState<string>("");
  function botaoApertado() { 
    console.log("Camada Control: funcao botaoApertado() executada");
    servico.gravar("email digitado");
  }
  return {
    botaoApertado
  }
}

export default function App() {
  const {botaoApertado} = useControl();
  return (
    <View style={styles.container}>
      <Text>Agenda de contato</Text>
      <StatusBar style="auto" />
      <Button title="Salvar" onPress={()=>{
        console.log("Camada de Tela: Botão foi apertado");
        botaoApertado();
      }}/>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });
