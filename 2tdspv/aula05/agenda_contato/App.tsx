import React from "react";
import {View, Text} from "react-native";


function Principal() { 
  return (
    <View style={{flexDirection : "row", 
        backgroundColor: "pink",
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "stretch"}}>
      <View style={{width: 50, 
        backgroundColor: "red"}}/>
      <View style={{width: 50,
        backgroundColor: "yellow",
        alignSelf: "stretch"}}/>
      <View style={{width: 50,  
        backgroundColor: "blue"}}/>
      {/* <View style={{flex: 5, 
        backgroundColor: "red"}}/>
      <View style={{flex: 3, 
        backgroundColor: "yellow"}}/>
      <View style={{flex: 1,
        backgroundColor: "blue"}}/> */}
    </View>
  )
}

export default Principal;