import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { ContatoModulo } from './ContatoScreen';
import { CicloSocialModulo } from './CicloSocialScreen';

const {Screen, Navigator} = createDrawerNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator>
          <Screen name="Contato">
            {  ( navProps : ParamListBase )=>
              <ContatoModulo {...navProps}/> }
          </Screen>
          <Screen name="CicloSocial" 
                component={CicloSocialModulo}/>
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
