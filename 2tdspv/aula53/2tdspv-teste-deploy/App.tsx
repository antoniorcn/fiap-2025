import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {useRef} from 'react';

export default function App() {
  const mapsRef = useRef<any>(null);
  return (
    <View style={styles.container}>
      <Text>Mapa da Cidade de São Paulo</Text>
      <Button title="Ir para Unicamp" 
        onPress={()=>{
          const regiao = {
            latitude: -22.819401884502682,
            longitude: -47.086150075688074,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0121
          }
          if (mapsRef.current != null) {
            mapsRef.current.animateToRegion(regiao);
          }
        }}/>
      <Button title="Ir para FIAP" 
        onPress={()=>{
          const regiao = {
            latitude: -23.563917075822705, 
            longitude: -46.65237577462707,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0121
          }
          if (mapsRef.current != null) {
            mapsRef.current.animateToRegion(regiao);
          }
        }}/>        
      <MapView ref={mapsRef} style={{flex: 1}} initialRegion={{
        latitude: -23.563917075822705, 
        longitude: -46.65237577462707,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121
      }}>
        <Marker coordinate={{
          latitude: -23.563917075822705, 
          longitude: -46.65237577462707
        }} title="Fiap" description="FIAP Av. Paulista"/>
        <Marker coordinate={{
          latitude: -22.819401884502682,
          longitude: -47.086150075688074
        }} title="Unicamp"description="Universidade Estadual de Campinas"/>
      </MapView> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
});
