import React from "react";
import {Text, View} from "react-native";

const quadrado = {width: 50, height: 50}
const vermelho = {backgroundColor : "red"}
const verde = {backgroundColor : "green"}
const azul = {backgroundColor : "blue"}

function Principal() { 
  return ( 
    <View style={{
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "flex-start",
      backgroundColor: "yellow"}}>
      <View style={[quadrado, vermelho]}></View>
      <View style={[quadrado, verde]}></View>
      <View style={[quadrado, azul]}></View>
    </View>
  )
}

export default Principal;