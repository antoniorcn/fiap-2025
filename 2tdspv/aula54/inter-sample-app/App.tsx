import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import "./utils/internationalization";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { formatDate, formatMoney } from './utils/formatador';
import { getLocales } from 'expo-localization';

export default function App() {
  const {regionCode} = getLocales()[0];
  // let currencyCode = regionCode == "BR" ? "BRL" : "USD";
  const [currencyCode, setCurrencyCode] = useState<string>("BRL");
  console.log("Region Code: ",regionCode);
  console.log("Locale ==> ", getLocales()[0]);
  const {i18n, t} = useTranslation();
  const [sales, setSales] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("0");
  const partAverageValue = parseFloat( sales ) / parseFloat( quantity );
  return (
    <View style={styles.container}>
      <Text>{t("greeting")} </Text>
      <Text>{t("app_launch_date") + " " + formatDate(new Date())}</Text>
      <Text>{t("price") + " " + formatMoney(67.80, currencyCode)}</Text>

      <StatusBar style="auto" />
      <Button title="Português" onPress={()=>{
        i18n.changeLanguage("pt");
        setCurrencyCode("BRL");
      }}/>
      <Button title="English" onPress={()=>{
        i18n.changeLanguage("en");
        setCurrencyCode("USD");
      }}/>

      <Text>{t("type_sales_last_quarter")}</Text>
      <TextInput style={{borderWidth: 1}} keyboardType="decimal-pad"
        value={sales} onChangeText={setSales}/>
      <Text>{t("sales_amount_last_quarter", {"amount": parseFloat(sales)})}</Text>
      <Text>{t("type_items_quantity")}</Text>
      <TextInput style={{borderWidth: 1}} keyboardType="decimal-pad"
        value={quantity} onChangeText={setQuantity}/>
      <Text>{t("sales_summary", {"count": parseFloat(quantity), 
            "partValue": partAverageValue} )}</Text>
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
