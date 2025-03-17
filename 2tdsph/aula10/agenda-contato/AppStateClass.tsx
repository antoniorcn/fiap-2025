import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const HelloFunction = ( props : any ) : React.ReactElement => {
  console.log("Hello Function Criado...");
  let counter = 0 
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Hello Function {counter}</Text>
      <Button title="Incrementar" 
              onPress={()=>{counter = counter + 1}}/>
    </View>
  )
}

class HelloClass extends React.Component {
  // state = {counter : 0};

  constructor ( props : any ) { 
    super( props );
    this.state = { counter : 0 };
    console.log("Hello class criado....");
  }

  render() : React.ReactElement { 
    console.log("Hello class redesenhado....");
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Hello Class {this.state.counter}</Text>
      <Button title="Incrementar" 
              onPress={()=>{ 
                this.setState( { counter : this.state.counter + 1 } );
                console.log("Contador atualizado: ", this.state.counter);
              }}/>
    </View>
    )
  }
}

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow"}}>
      <HelloClass/>
    </View>
  );
}
