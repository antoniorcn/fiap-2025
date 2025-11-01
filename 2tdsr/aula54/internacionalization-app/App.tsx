import "./inter.ts";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { getLocales, getCalendars } from 'expo-localization';
import { formatDate, formatMoney } from './utils';

export default function App() {
  const {i18n, t} = useTranslation();
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<string>("");

  const {
    languageTag, languageCode,  textDirection,
    digitGroupingSeparator,   decimalSeparator,
    currencySymbol, currencyCode,  regionCode, measurementSystem
  } = getLocales()[0];
  const { calendar, timeZone, uses24hourClock, firstWeekday } = getCalendars()[0];
  console.log(languageTag);		// "pt-BR", "en-US", etc.
  console.log(regionCode);		// "BR", "US", "GB"
  console.log(timeZone);	// "America/Sao_Paulo"
  console.log(textDirection);		// LTR ou RTL
  console.log(measurementSystem); 
  // "metric" no Brasil -> você mostra "kg", "km"
  // "us" nos EUA -> você pode mostrar "lb", "mi"
  console.log(currencyCode); 
  // Moeda preferida do usuário/sistema (ex: "BRL", "USD")
  console.log(calendar);  
  // "gregorian", "islamic", etc. (útil em apps muito globais)




  return (
    <View style={styles.container}>
      <Text>Lançado em: {formatDate(new Date())}</Text>
      <Text>Preço: {formatMoney(129.9, 'BRL')}</Text>

      <Text>{t("greeting")}</Text>
      <Text>{t("enter_your_name")}</Text>
      <TextInput style={{borderWidth: 1}} value={nome} onChangeText={setNome}/>

      <Button title={t("welcome")} onPress={()=>{
        alert(t("welcome_message", {name: nome}));
      }} />
      <Text>{t("items")}</Text>
      <TextInput style={{borderWidth: 1}} value={valor} onChangeText={setValor}/>

      <Button title={t("checkout")} onPress={()=>{
        alert(t("item", {count: parseInt(valor)}));
      }} />

      <Button title={t("credits")} onPress={()=>{
        alert(t("credit_message"));
      }} />
      <Button title="Portugues" onPress={()=>{
        i18n.changeLanguage("pt");
      }} />
      <Button title="English"  onPress={()=>{
        i18n.changeLanguage("en");
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
