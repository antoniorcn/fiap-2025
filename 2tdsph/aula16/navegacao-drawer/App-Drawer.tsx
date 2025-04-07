import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const {Screen, Navigator} = createDrawerNavigator();

const TelaA = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightyellow",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Tela A</Text>
      <Button title="Abrir Drawer" 
          onPress={() => props.navigation.openDrawer()} />
      <Button title="Fechar Drawer" 
          onPress={() => props.navigation.closeDrawer()} />
    </View>
  )
}

const TelaB = ( props : ParamListBase) : React.ReactElement => { 
  return (
    <View style={{  flex: 1, backgroundColor : "lightcyan",
                    alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 48}}>Tela B</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Navegação Drawer</Text>
        <Navigator initialRouteName="Tela A" screenOptions={{
          headerShown: true,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 240,
            
          },
          drawerActiveBackgroundColor: 'blue',
          drawerInactiveBackgroundColor: 'lightblue',
          drawerPosition: 'left',
        }}>
          <Screen name="Tela A" component={TelaA} />
          <Screen name="Tela B" component={TelaB} />
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
