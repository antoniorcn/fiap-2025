import React from "react";
import { View, Text } from "react-native";

function Principal() { 
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontSize: 26}}>Olá, mundo React Native!</Text>
    </View>
  );
}

export default Principal;