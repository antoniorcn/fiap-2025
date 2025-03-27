import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const TelaA = (props : any) : React.ReactElement =>  {
  return ( 
    <View style={{flex: 1, justifyContent: "center",
        backgroundColor: "lightyellow", 
        alignItems: "center"
    }}>
      <Text style={{fontSize: 48}}>Tela A</Text>
      <Button title="Ir para Tela B" onPress={()=>{
        props.navigation.navigate("telaB");
        // props.navigation.popTo("telaB");
      }}/>
    </View>
  )
}

const TelaB = (props : any) : React.ReactElement =>  {
  return ( 
    <View style={{flex: 1, justifyContent: "center",
        backgroundColor: "lightcyan", 
        alignItems: "center"
    }}>
      <Text style={{fontSize: 48}}>Tela B</Text>
      <Button title="Ir para Tela C" onPress={()=>{
        props.navigation.navigate("telaC");
        // props.navigation.popTo("telaC");
      }}/>
    </View>
  )
}

const TelaC = (props : any) : React.ReactElement =>  {
  return ( 
    <View style={{flex: 1, justifyContent: "center",
        backgroundColor: "lightpink", 
        alignItems: "center"
    }}>
      <Text style={{fontSize: 48}}>Tela C</Text>
      <Button title="Ir para Tela A" onPress={()=>{
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
        <Text style={{fontSize: 48}}>Cabeçalho</Text>
        <Navigator initialRouteName="telaA">
          <Screen name="telaA" component={TelaA} />
          <Screen name="telaB" component={TelaB} />
          <Screen name="telaC" component={TelaC} />
        </Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
