
import { View, Text, Button} from "react-native";

const TelaA = (props : any) : React.ReactElement => {
  return (
    <View style={{flex: 1, justifyContent: "center",
      alignItems: "center", backgroundColor: "#FFCCCC"
    }}>
      <Text style={{fontSize: 38}}>Tela A</Text>
      <Button title="Ir para Tela B" onPress={()=>{
        // props.navigation.navigate("telaB");
        props.navigation.popTo("telaB");
      }}/>
    </View>
  )
}

export default TelaA;