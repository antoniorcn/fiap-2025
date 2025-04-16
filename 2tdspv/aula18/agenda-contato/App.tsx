import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { ContatoModulo } from './ContatoScreen';
import { Contato } from './Contato';

const {Screen, Navigator} = createDrawerNavigator();

const CicloSocialModulo = () : React.ReactElement => {
  return (
    <View>
      <Text>Ciclo Social</Text>
    </View>
  )
}

export default function App() {
  const [lista, setLista] = useState<Contato[]>([]);

  const gravar = ( nome : string, telefone : string, email : string) => { 
    const obj : Contato = {nome, telefone, email};
    setLista( [ ...lista,  obj ] );
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator>
          <Screen name="Contato">
            {  ( navProps : ParamListBase )=>
              <ContatoModulo {...navProps} onGravar={gravar} lista={lista}/> }
          </Screen>
          <Screen name="CicloSocial" component={CicloSocialModulo}/>
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
