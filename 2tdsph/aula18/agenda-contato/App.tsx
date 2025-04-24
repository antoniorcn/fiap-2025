import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListRoute } from '@react-navigation/native';
import { createDrawerNavigator }  from '@react-navigation/drawer';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import CicloSocialModulo from './CicloSocialModulo';
import ContatoModulo from './ContatoModulo';

const {Screen, Navigator} = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Cadastro de Amigos</Text>
        <Navigator>
          <Screen name="contatos" component={ContatoModulo}
            options={{
              title: "Contatos",
              drawerIcon: ({size, color})=>
                <AntDesign name="contacts" color={color} size={size}/>
            }}/>
          <Screen name="ciclo-social" component={CicloSocialModulo}
            options={{
              title: "Ciclo Social",
              drawerIcon: ({size, color})=>
                <FontAwesome6 name="people-group" color={color} size={size}/>
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
  contato_item : {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "lightyellow",
    margin: 10,
    padding: 10
  },
  input : { 
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'lightcyan',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 10,
    alignSelf: 'stretch'
  }
});
