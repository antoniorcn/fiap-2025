import React from 'react';
import {Alert, Text, View, Button} from "react-native";

export default () => { 
  return (
    <View>
      <Button title="Incrementar" onPress={()=>alert("incrementando")}/>
      <Text>Contador: 0</Text>
      <Button title="Decrementar" onPress={()=>alert("decrementando")}/>
    </View>
  )
}