import React from "react";
import {View, Text} from "react-native";

function Principal() : React.ReactElement { 
  let a : number = 10;
  return ( 
    <View style={{flex: 1, backgroundColor: "yellow"}}>
      <Text>Hello World</Text>
      <Text>A: {a}</Text>
    </View>
  );
}

export default Principal;