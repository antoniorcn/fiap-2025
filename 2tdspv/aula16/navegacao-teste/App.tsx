import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

const {Navigator, Screen} = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const TelaB1 = ( props : ParamListBase ) : React.ReactElement => { 
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow",
              justifyContent: "center", alignItems: "center"}}>
      <Text>Tela B1</Text>
    </View>
  );
}

const TelaB2 = ( props : ParamListBase ) : React.ReactElement => { 
  return (
    <View style={{flex: 1, backgroundColor: "lightyellow",
              justifyContent: "center", alignItems: "center"}}>
      <Text>Tela B2</Text>
    </View>
  );
}

const TelaB = ( props : ParamListBase ) : React.ReactElement => { 
  return (
    <View style={{flex: 1, backgroundColor: "lightcyan",
              justifyContent: "center", alignItems: "stretch"}}>
      <Text>Tela B</Text>
      <Tab.Navigator>
        <Tab.Screen name="tela_b1" component={TelaB1}/>
        <Tab.Screen name="tela_b2" component={TelaB2}/>
      </Tab.Navigator>
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
            drawerIcon: ({color, size, focused}) =>
              <Entypo name="home" size={size} color={color}/>
          }}/>
          <Screen name="tela_b" component={TelaB} options={{
            title: "Componente Tela B",
            drawerIcon: () => <Text>Foguete</Text>
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
