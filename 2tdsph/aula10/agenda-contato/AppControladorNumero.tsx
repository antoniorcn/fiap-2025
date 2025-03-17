import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';


function ControladorNumero ( props : any ) : React.ReactElement { 
  return (
    <View style={{flexDirection: "row", width: "100%", 
                  justifyContent: "center"}}>
      <Button title=" - " onPress = {()=>{
        // props.setContador( props.contador - 1 );
        // console.log("Decrementando para: ", props.contador);
        props.setContador( 
          ( valorAtual : number ) => {
            const valorNovo = valorAtual - 1;
            console.log("Decrementando para: ", valorNovo);
            return valorNovo;
          }
        );
      }}/>
      <Text style={{fontSize: 20}}> {props.contador} </Text>
      <Button title=" + " onPress = {()=>{
        // props.setContador( props.contador + 1 );
        // console.log("Incrementando para: ", props.contador);
        props.setContador( 
          ( valorAtual : number ) => {
            const valorNovo = valorAtual + 1;
            console.log("Incrementando para: ", valorNovo);
            return valorNovo;
          }
        );
      }}/>
    </View>
  )
}

export default function App() {
  const [numero1, setNumero1] = useState( 10 );
  const [numero2, setNumero2] = useState( 20 );
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow", 
                  justifyContent: "center"}}>
      <Text>Primeiro Numero</Text>
      <ControladorNumero contador={numero1} setContador={setNumero1}/>
      <Text>Segundo Numero</Text>
      <ControladorNumero contador={numero2} setContador={setNumero2}/>
      <Text style={{fontSize: 32}}>Soma: {numero1 + numero2}</Text>
    </View>
  );
}
