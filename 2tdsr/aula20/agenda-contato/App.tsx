import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContatoScreen } from './ContatoScreen';
import {CicloSocialScreen} from './CicloSocialScreen';

const {Screen, Navigator} = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator>
          <Screen name="Contato" component={ContatoScreen} />
          <Screen name="CicloSocial" component={CicloSocialScreen} />
        </Navigator>
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
