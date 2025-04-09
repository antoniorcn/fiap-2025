import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

const {Navigator, Screen} = createBottomTabNavigator();

const TelaA = ( props : ParamListBase ) : React.ReactElement => { 
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow",
              justifyContent: "center", alignItems: "center"}}>
      <Text>Tela A</Text>
      <Button title="Ir para Tela B" onPress={()=>{
        // props.navigation.popTo("tela_b");
        props.navigation.navigate("tela_b");
      }}/>
    </View>
  );
}

const TelaB = ( props : ParamListBase ) : React.ReactElement => { 
  return (
    <View style={{flex: 1, backgroundColor: "lightcyan",
              justifyContent: "center", alignItems: "center"}}>
      <Text>Tela B</Text>
      <Button title="Ir para o inicio" onPress={()=>{
        // props.navigation.popTo("tela_a");
        props.navigation.popToTop();
      }}/>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Teste de Navegação</Text>
        <Navigator  initialRouteName="tela_a" screenOptions={{
          headerShown: true
        }}>
          <Screen name="tela_a" component={TelaA} options={{
            title: "Componente Tela A",
            tabBarIcon: ({color, size, focused}) =>
              <Entypo name="home" size={size} color={color}/>
          }}/>
          <Screen name="tela_b" component={TelaB} options={{
            title: "Componente Tela B",
            tabBarIcon: () => <Text>Foguete</Text>
          }}/>          
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
