import { View, Text, TextInput, Button } from "react-native";
import { useVendaControl } from "./vendaControl";

type VendaViewProps = { 

}

const VendaView : React.FC<VendaViewProps> = () => { 
    const {id, setId, titulo, setTitulo,
        preco, setPreco, gravarVendaControl
    } = useVendaControl();
    return ( 
        <View style={{flex: 1}}>
            <Text>Titulo: </Text>
            <TextInput value={titulo} 
            onChangeText={setTitulo}/>

            <Text>Preço: </Text>
            <TextInput value={preco} 
            onChangeText={setPreco}/>

            <Button title="Gravar" 
                onPress = {gravarVendaControl}/>
        </View>
    )
}

export default VendaView