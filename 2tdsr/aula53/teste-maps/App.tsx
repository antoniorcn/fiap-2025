import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const APIKEY = process.env.EXPO_PUBLIC_GoogleAPI;

const listaLocais = [ 
  {lat: -23.55010333888417, log: -46.63419017615955, titulo: "Praça da Sé"},
  {lat: -23.55722247520962, log: -46.63474283662919, titulo: "Restaurante Hello Kit"},
  {lat: -23.54425036119656, log: -46.62726639749676, titulo: "Museu Catavento"},
  {lat: -23.547780535236424, log: -46.63261930499507, titulo: "Pateo do Colegio"},
  {lat: -23.546687069718892, log: -46.63618565223941, titulo: "Casa Godinho"}
];

const origem = {latitude: -23.55010333888417, longitude: -46.63419017615955};
const destino = {latitude: -23.55722247520962, longitude: -46.63474283662919};

export default function App() {

  const mapRef = useRef( null );

  const markers = listaLocais.map( ( local, indice )=>
    <Marker key={"marker-"+indice} coordinate={{
      latitude: local.lat, 
      longitude: local.log
      }}
      title={local.titulo}
      description={local.titulo}
  />)

  const [makerPlace, setMarkerPlace] = useState<number>( 0 );



  return (
    <View style={styles.container}>
      <Text>App de Mapa</Text>
      <Button title="Go" onPress={()=>{
          setMarkerPlace( ( oldMarker ) => { 
            let valorNovo = oldMarker + 1;
            if (valorNovo >= listaLocais.length) { 
              valorNovo = 0;
            }
            const local = listaLocais[valorNovo];
            const region = {
        			latitude: local.lat, 
        			longitude: local.log,
        			latitudeDelta: 0.0922,
        			longitudeDelta: 0.0421
    		    };
            if (mapRef != null) { 
              mapRef.current.animateToRegion( region );
            }

            return valorNovo;
          })
      }}/>
      <StatusBar style="auto" />
      <MapView  ref={mapRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: -23.573894710055153, 
          longitude: -46.62319959150058,
          latitudeDelta: 0.2222,
          longitudeDelta: 0.0421
        }}>
          {markers}
        <MapViewDirections
          origin={origem}
          destination={destino}
          apikey={APIKEY}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>

    </View>
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
