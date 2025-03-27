import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const TelaA = (props : any) : React.ReactElement =>  {
  return ( 
    <View style={{flex: 1, justifyContent: "center",
        backgroundColor: "lightyellow", 
        alignItems: "center"
    }}>
      <Text style={{fontSize: 48}}>Tela A</Text>
      <Button title="Ir para Tela B" onPress={()=>{
        props.navegar("B");
      }}/>
    </View>
  )
}

const TelaB = (props : any) : React.ReactElement =>  {
  return ( 
    <View style={{flex: 1, justifyContent: "center",
        backgroundColor: "lightcyan", 
        alignItems: "center"
    }}>
      <Text style={{fontSize: 48}}>Tela B</Text>
      <Button title="Ir para Tela A" onPress={()=>{
        props.navegar("A");
      }}/>
    </View>
  )
}

export default function App() {
  const [tela, setTela] = useState("B");

  const navigate = ( nomeTela : string ) => { 
    setTela( nomeTela );
  }

  return (
    <View style={styles.container}>
      { tela === "A" ?  <TelaA navegar={navigate}/> : 
                        <TelaB navegar={navigate}/> }
      <StatusBar style="auto" />
    </View>
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
