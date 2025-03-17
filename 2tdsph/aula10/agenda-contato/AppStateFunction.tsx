import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const HelloFunction = ( props : any ) : React.ReactElement => {
  // const estado = useState( 0 ); //  [ valorVariavel,  funcaoQueAltera ]
  // const contador = estado[0];
  // const setContador = estado[1];
  const [ contador, setContador ] = useState( 0 );
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Hello Function {contador}</Text>
      <Button title="Incrementar" 
              onPress={()=>{
                setContador( contador + 1 )
                console.log("Contador: ", contador);
              }}/>
    </View>
  )
}

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow"}}>
      <HelloFunction/>
    </View>
  );
}
