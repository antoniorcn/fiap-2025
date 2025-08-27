import React from 'react';
import {View, Text} from 'react-native';

function Principal() {
  return (
    <View style={{
              flex: 1, 
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "stretch",
              backgroundColor: "yellow"}}>
      <Text style={{
          // flex: 2, 
          borderWidth: 1, fontSize: 18}}>Ola Mundo Flex Box - Linha 1</Text>
      <Text style={{
          // flex: 0.5, 
          borderWidth: 1, fontSize: 18}}>Ola Mundo Flex Box - Linha 2</Text>
      <Text style={{
          // flex: 1, 
          alignSelf: "flex-end",
          borderWidth: 1, fontSize: 18}}>Ola Mundo Flex Box - Linha 3</Text>
    </View>
  );
}

export default Principal;
