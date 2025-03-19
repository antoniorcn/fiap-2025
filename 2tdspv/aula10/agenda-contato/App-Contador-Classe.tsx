import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';


class Contador extends React.Component { 

  state = { contador : 0 }

  constructor( props : any) { 
    super(props);
    console.log("Componente criado ... ");
  }

  render() { 
    console.log("Atualizando a tela ... ");
    return (
      <View style={{flexDirection: "row", 
      justifyContent: "center",
      alignSelf: "stretch"}}>
        <Button title= " - " onPress={()=>{
          this.setState( { contador : this.state.contador - 1} );
          console.log("Contador: ", this.state.contador);
        }}/>
        <Text style={{fontSize: 64}}> {this.state.contador} </Text>
        <Button title= " + " onPress={()=>{
          this.setState( { contador : this.state.contador + 1} )
          console.log("Contador: ", this.state.contador);
        }}/>
      </View>
    )
  }

}



export default function App() {
  return (
    <View style={{flex: 1, 
        justifyContent: "space-around",
        padding: 50,
        alignItems: "center"}}>
      <Text style={{fontSize: 48}}>Contador</Text>
      <Contador/>
    </View>
  );
}