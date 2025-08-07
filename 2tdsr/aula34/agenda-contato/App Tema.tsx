import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, 
  useColorScheme, useWindowDimensions } from 'react-native';

export default function App() {
  const schema = useColorScheme();
  const [tema, setTema] = useState<string>( schema ?? "light");

  // const dimensions = useWindowDimensions();
  // dimensions.width
  const {width, height, fontScale} = useWindowDimensions();

  const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    font: {
      fontSize : 14 * fontScale,
      color : "white"
    },
  });

  const stylesLight = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    font: {
      fontSize : 14 * fontScale,
      color : "black"
    }
  });

  const styles = tema === "light" ? stylesLight : stylesDark;

  console.log("Font Scale: ", fontScale);

  return (
    <View style={styles.container}>
      <Text style={styles.font}>Agenda de contato</Text>
      <StatusBar style="auto" />
      <Button title="Dark" onPress={()=>setTema("dark")}/>
      <Button title="Light" onPress={()=>setTema("light")}/>
    </View>
  );
}

