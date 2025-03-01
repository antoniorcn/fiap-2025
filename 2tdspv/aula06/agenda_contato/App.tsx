import React from "react";
import { Alert, Button, Image, View, Text, 
  ToastAndroid, Switch } from "react-native";

import imgPuppy from "./assets/puppy.webp";

const Principal = () : React.ReactElement => { 
  return (
    <View style={{flex: 1}}>
      <Text>Hello world - Componentes 2</Text>
      <Switch thumbColor="blue"
        trackColor={{false: "lightgray", 
          true : "darkgray"}}
        value={true} />
      <Button title="Aperte aqui"
        onPress = {()=>{
         Alert.alert("Mensagem de alerta",
          "Texto do alerta"
         ); 
        }} 
      />

      <Button title="Mensagem Toast" 
        onPress={()=>{
          ToastAndroid.show("Mensagem no Toast", 
              ToastAndroid.LONG);
        }} />

      <Image
        source={{uri:"https://www.gettyimages.com.br/detail/foto/portrait-of-white-pomeranian-on-field-indirapuram-imagem-royalty-free/1465997070"}}
        style={{flex: 1,
          width: 100, height: 100}}
      />

      {/* <Image 
        source={imgPuppy}
        resizeMode="stretch"
        style={{flex: 1, width: "100%"}}
      /> */}
    </View>
  )
}

export default Principal;
