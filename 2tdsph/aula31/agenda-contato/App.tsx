import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface Contato { 
  nome : string
  email : string
  telefone : string
}

class ContatoFetcher { 
  salvarAPI( contato : Contato ) { 
    console.log("Camada Fetcher: salvarAPI() - executado");
    console.log(`Camada Fetcher: salvando email: ${contato.email} na APIRest`);
  }
}

class ContatoServico {
  fetcher = new ContatoFetcher();
  salvar( contato : Contato  ) { 
    console.log("Camada Servico: salvar() - executado");
    console.log(`Camada Servico: salvando email: ${contato.email}`);
    this.fetcher.salvarAPI( contato );
  }
}


const useContatoControl = () => {
  const servico = new ContatoServico();
  const [email, setEmail] = useState<string>(""); 
  const salvar = () => {
    const contato : Contato = { nome: "", telefone : "", email }
    console.log("Camada Control: salvar() - executado");
    servico.salvar( contato );
  }
  return {
    email, setEmail, salvar
  }
}

const ContatoView = () => {
  const {email, setEmail, salvar} = useContatoControl();
  return ( 
    <View style={{flex: 1, justifyContent: "center",
     alignItems: "stretch"}}>
      <View style={{flexDirection: "row", 
        alignItems: "center"}}>
        <Text>Email: </Text>
        <TextInput style={{backgroundColor: "lightcyan", 
          borderColor: "pink", borderWidth: 1, flex: 1}}
          value={email} onChangeText={setEmail}/>
      </View>
      <Button title="Salvar" onPress={()=>{
        console.log("ContatoView - botao salvar pressionado");
        salvar();
      }}/>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <ContatoView/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
