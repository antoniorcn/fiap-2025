import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaA from './TelaA';

const {Navigator, Screen} = createStackNavigator();  // { Navigator:{}, Screen: {}}



const TelaB = (props : any) : React.ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: "center",
      alignItems: "center", backgroundColor: "#FFFFCC"
    }}>
      <Text style={{fontSize: 38}}>Tela B</Text>
      <Button title="Ir para Tela C" onPress={()=>{
        // props.navigation.navigate("telaC");
        props.navigation.popTo("telaC");
      }}/>
    </View>
  )
}

const TelaC = (props : any) : React.ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: "center",
      alignItems: "center", backgroundColor: "#CCFFFF"     }}>
      <Text style={{fontSize: 38}}>Tela C</Text>
      <Button title="Ir para Tela A" onPress={()=>{
        // props.navigation.navigate("telaA");  // Empilha as telas
        props.navigation.popTo("telaA");   // Navega direto sem empilhar
      }}/>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator initialRouteName="telaA">
          <Screen name="telaA" component={TelaA}/>
          <Screen name="telaB" component={TelaB}/>
          <Screen name="telaC" component={TelaC}/>
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "50%"
  },
});
