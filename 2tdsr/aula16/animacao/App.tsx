import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useLayoutEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


const MeuComponente = (props : any) : React.ReactElement => {
  const [texto, setTexto] = React.useState("");
  useLayoutEffect( ()=> {
    console.log("LayoutEffect disparado");

    return () => { console.log("Componente desmontado");  }
  }, []);
  useEffect( ()=> {
    console.log("UseEffect disparado");

    return () => { console.log("Componente desmontado");  }
  }, []);

  return (
    <Text>Hello World {props.valor}</Text>
  )
}


export default function App() {
  const [contador, setContador] = React.useState(0);
  return (
    <View style={styles.container}>
      <MeuComponente valor={contador}/>
      <Button title="Incrementar" onPress={()=>{
        setContador(contador + 1);
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
});
