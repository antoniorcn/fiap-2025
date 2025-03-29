import { StatusBar } from 'expo-status-bar';
import { Button, Image, ImageBackground, StyleSheet, Switch, Text, View } from 'react-native';
import React, { useState } from 'react';
import imgWindows from './assets/windows11.jpg';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();
/* 
{ 
  Navigator: { // Mecanismo de navegação },
  Screen: { // Componente que carrega a Tela} 
}
*/

const TelaA = ( props : any ) : React.ReactElement => { 
  const [modo, setModo] = useState<boolean>(true);
  return ( 
    <View style={{flex: 4, justifyContent: "space-around",
              alignItems: "center", backgroundColor: "lightpink"}}>
        <Text style={{fontSize: 32}}>Componentes II</Text>
        <Text style={{fontSize: 28}}>Tela A</Text>
        <View style={{flexDirection: "row", alignSelf: "stretch",
          justifyContent: "space-around"}}>
          <Text>Modo escuro</Text>
          <Switch thumbColor="green" 
            value={modo}
            onValueChange={setModo}
            trackColor={{
              true: "gray", false: "lightgray"
            }}/>
        </View>
        <Button title="Ir para Tela B" onPress={()=>{
          props.navigation.navigate("telaB")
        }}/>
      </View>
  )
}


const TelaB = ( props : any ) : React.ReactElement => { 
  const [modo, setModo] = useState<boolean>(true);
  return ( 
    <View style={{flex: 4, justifyContent: "space-around",
              alignItems: "center", backgroundColor: "lightyellow"}}>
        <Text style={{fontSize: 32}}>Componentes II</Text>
        <Text style={{fontSize: 28}}>Tela B</Text>
        <View style={{flexDirection: "row", alignSelf: "stretch",
          justifyContent: "space-around"}}>
          <Text>Fazer Backup:</Text>
          <Switch thumbColor="green" 
            value={modo}
            onValueChange={setModo}
            trackColor={{
              true: "gray", false: "lightgray"
            }}/>
        </View>
        <View style={{flexDirection: "row"}}>
          <Button title="Voltar para tela A" onPress={()=>{
            // props.navigation.navigate("telaA");
            props.navigation.goBack();
          }}/>
          <Button title="Ir para a Tela C" onPress={()=>{
            props.navigation.navigate("telaC");
          }}/>
        </View>
      </View>
  )
}


const TelaC = (props : any) : React.ReactElement => { 
  const [modo, setModo] = useState<boolean>(true);
  return ( 
    <View style={{flex: 4, justifyContent: "space-around",
              alignItems: "center", backgroundColor: "lightgreen"}}>
        <Text style={{fontSize: 32}}>Componentes II</Text>
        <Text style={{fontSize: 28}}>Tela C</Text>
        <View style={{flexDirection: "row", alignSelf: "stretch",
          justifyContent: "space-around"}}>
          <Text>Fazer Backup:</Text>
          <Switch thumbColor="green" 
            value={modo}
            onValueChange={setModo}
            trackColor={{
              true: "gray", false: "lightgray"
            }}/>
        </View>
        <Button title="Ir para a Tela A" onPress={()=>{
            // props.navigation.navigate("telaA");
            // props.navigation.popTo("telaA");
            props.navigation.popToTop();
        }}/>
      </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <Image source={require("./assets/windows11.jpg")} /> */}
        {/* <Image source={imgWindows} resizeMode='contain'  
              style={{height: "50%"}}/>*/}
        <View style={{flex: 2}}>
          <ImageBackground source={imgWindows} resizeMode='stretch'
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: "white", fontSize: 42, fontWeight: "bold",
              textShadowColor: "black", textShadowRadius: 5, 
                textShadowOffset: {width: 5, height: 5}
          }}>Windows 11</Text>
          </ImageBackground>
        </View>
        <View style={{flex: 4}}>
          <Navigator initialRouteName="telaA">
            <Screen name="telaA" component={TelaA}/>
            <Screen name="telaB" component={TelaB}/>
            <Screen name="telaC" component={TelaC}/>
          </Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
