import React from "react";
import { View, Text, Switch, Image } from "react-native";
import dogImg from "./assets/dog.jpeg";

const Principal = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Ligar 2: </Text>
      <Switch value={false}
        thumbColor = {"yellow"}
        trackColor={{true: "pink", false: "cyan"}}/>
      <Image 
        style={{width:200, height:200}}
        resizeMode="center"
        source={dogImg}
        />
    </View>
  )
} 

export default Principal;