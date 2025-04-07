import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

const {Screen, Navigator} = createBottomTabNavigator();

const Pets = ( props : ParamListBase ) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1}}>
      <Text style={{fontSize: 54}}>Pets</Text>
    </View>
  )
}

const Agenda = ( props : ParamListBase ) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1}}>
      <Text style={{fontSize: 54}}>Agenda</Text>
    </View>
  )
}

const Configuracoes = ( props : ParamListBase ) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1}}>
      <Text style={{fontSize: 54}}>Configurações</Text>
    </View>
  )
}

const Perfil = ( props : ParamListBase ) : React.ReactElement => { 
  return ( 
    <View style={{flex: 1}}>
      <Text style={{fontSize: 54}}>Perfil</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Pitz</Text>
        <Navigator>
          <Screen name="Pets" component={Pets} 
            options={{
              tabBarIcon : (scrProps : any) => <MaterialIcons name="pets" 
                              size={scrProps.size} color={scrProps.color}/>
          }}/>
          <Screen name="Agenda" component={Agenda}
              options={{
              tabBarIcon : (scrProps : any) => <Ionicons name="calendar" 
                            size={scrProps.size} color={scrProps.color}/> 
          }}/>
          <Screen name="Configuracoes" component={Configuracoes}
              options={{
              tabBarIcon : (scrProps : any) => <SimpleLineIcons name="settings" 
                            size={scrProps.size} color={scrProps.color}/> 
          }}/>
          <Screen name="Perfil" component={Perfil}
              options={{
              tabBarIcon : (scrProps : any) => <AntDesign name="user" 
                            size={scrProps.size} color={scrProps.color}/> 
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
