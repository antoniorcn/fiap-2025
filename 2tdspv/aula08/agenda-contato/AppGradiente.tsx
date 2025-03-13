import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {View} from 'react-native';

const App1 = () => { 
  return ( 
    <View style={{flex: 1, flexDirection: "column"}}>
      <View style={{flex: 3, flexDirection: "row"}}>
        <View style={{flex:1, backgroundColor: "white"}}/>
        <View style={{flex:1, backgroundColor: "yellow"}}/>
        <View style={{flex:1, backgroundColor: "cyan"}}/>
        <View style={{flex:1, backgroundColor: "green"}}/>
        <View style={{flex:1, backgroundColor: "magenta"}}/>
        <View style={{flex:1, backgroundColor: "red"}}/>
        <View style={{flex:1, backgroundColor: "blue"}}/>
      </View>
      <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 1, backgroundColor: "navy"}}/>
        <View style={{flex: 1, backgroundColor: "white"}}/>
        <View style={{flex: 1, backgroundColor: "purple"}}/>
        <View style={{flex: 3, backgroundColor: "black"}}/>
      </View>
    </View>
  )
}


const App2 = () : React.ReactElement => { 
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start = {{ x: 0.0, y: 0.0 }}
        end = {{ x: 1.0, y: 0.0 }}
        colors={['green', 'red', 'yellow']}
        style={{flex: 1}}>
      </LinearGradient>
    </View>
  );
}

export default App2;