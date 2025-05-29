import {useState} from 'react';
import { View, Dimensions, Text, Button} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import axios from 'axios';

export default () => { 
  const [dados, setDados] = useState<number[]>( [10, 50, 90] );

  return (
    <View>
  <Text>Bezier Line Chart</Text>
  <Button title="Carregar dados" onPress={()=>{
    axios.get("https://tdsph-ad96c-default-rtdb.firebaseio.com/dashboard.json")
    .then(( resposta )=>{
      setDados(resposta.data);
    })
    .catch(()=>{
      alert("Erro ao carregar os dados")
    })
  }}/>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: dados
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  )
}

