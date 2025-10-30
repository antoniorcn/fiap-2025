import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import "./inter";
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { getLocales, getCalendars } from 'expo-localization';
import { formatDate, formatMoney } from './utils';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView, { Marker } from 'react-native-maps';

const {Screen, Navigator} = createBottomTabNavigator();

function Detalhes() {
  const {i18n, t} = useTranslation();
  const [valor, setValor] = useState<string>("0.0");
  const [quantidade, setQuantidade] = useState<string>("0");

  const {  languageTag, languageCode,
  textDirection,
  digitGroupingSeparator,   decimalSeparator,
  currencySymbol,   regionCode } = getLocales()[0];
  console.log("LanguageTag ==> ", languageTag);
  console.log("LanguageCode ==> ", languageCode);
  console.log("TextDirection ==> ", textDirection);
  console.log("Digit Grouping Separator ==> ", digitGroupingSeparator);
  console.log("Decimal Separator ==> ", decimalSeparator);
  console.log("Currency Symbol ==> ", JSON.stringify(getLocales()[0]));
  console.log("Region Code ==> ", regionCode);
  
  return (
    <View style={{flex: 1}}>
      <Text>Lançado em: {formatDate(new Date())}</Text>
      <Text>Preço: {formatMoney(129.9, 'BRL')}</Text>

      <Text>{t("greeting")}</Text>
      <Text>{t("type_amount")}</Text>
      <TextInput style={{borderWidth: 1}} 
          value={valor} onChangeText={setValor}/>
      <Text>{t("report_sale", {"amount": parseFloat(valor)})}</Text>

      <Text>{t("type_quantity")}</Text>
      <TextInput style={{borderWidth: 1}} 
          value={quantidade} onChangeText={setQuantidade}/>
      <Text>{t("report_quantity", {"count": parseInt(quantidade)})}</Text>
      <StatusBar style="auto" />
      <Button title="Portugues" onPress={()=>{
        i18n.changeLanguage("pt");
      }} />
      <Button title="English" onPress={()=>{
        i18n.changeLanguage("en");
      }} />
    </View>
  );
}

const Mapa = () => { 
  const mapRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <Button title="Ir para o MASP" onPress={()=>{
        const region = { 
          latitude: -23.561295965997854, 
          longitude: -46.655892633830156,
          latitudeDelta: 0.00941,
          longitudeDelta: 0.00421
        };
        if (mapRef != null){ 
          mapRef.current.animateToRegion(region);
        }
      }} />
      <Button title="Ir para a Praia" onPress={()=>{
        const region = { 
          latitude: -23.791614906536864, 
          longitude: -45.56259116250522,
          latitudeDelta: 0.00941,
          longitudeDelta: 0.00421
        };
        if (mapRef != null){ 
          mapRef.current.animateToRegion(region);
        }
      }} />      
      <MapView style={{flex: 1}} ref={mapRef}
        initialRegion={{
          latitude: -23.561295965997854, 
          longitude: -46.655892633830156,
          latitudeDelta: 0.00941,
          longitudeDelta: 0.00421,
        }}>
          <Marker coordinate={{
            latitude: -23.561295965997854, 
            longitude: -46.655892633830156,
          }} title="Masp"  description="Avenida Paulista - Museu de Arte de São Paulo"/>

          <Marker coordinate={{
            latitude: -23.791614906536864, 
            longitude: -45.56259116250522
          }} title="Praia de Maresias" description="Praia apropriada para banho"/>
        </MapView>

    </View>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Navigator>
          <Screen name="Detalhes" component={Detalhes}/>
          <Screen name="Mapa" component={Mapa}/>
        </Navigator>
      </View>
    </NavigationContainer>
  )
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
