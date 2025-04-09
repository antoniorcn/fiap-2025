import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

const {Screen, Navigator} = createDrawerNavigator();

const ComponentA = (props : any) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1, backgroundColor: "lightyellow",
          justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 48}}>Tela A</Text>
    </View>
  )
}

const ComponentB = (props : any) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1, backgroundColor: "lightcyan",
          justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: 48}}>Tela B</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Navegacao por Abas</Text>
        <Navigator screenOptions={{
          headerShown: true,
          headerBackground: ()=><View style={{backgroundColor:"red", flex: 1}}><Text>Meu Texto</Text></View>
        }}>
          <Screen options={{
            drawerIcon: ({size, color, focused})=>
                <AntDesign name="home" size={size} color={color} />
          }} name="telaA" component={ComponentA}/>
          <Screen name="telaB" component={ComponentB}/>
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
