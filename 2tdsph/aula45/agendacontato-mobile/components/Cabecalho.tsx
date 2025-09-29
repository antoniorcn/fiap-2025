import { View, Text } from "react-native"
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { useContext } from "react";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";

interface CabecalhoProps { 

}

const Cabecalho : React.FC<CabecalhoProps> = () => { 
    const route = useRoute();
    const {token} = useContext(ContextoPrincipal);
    const navigation = useNavigation<RootScreenNavigationProp>();
    return ( 
        <View style={{flexDirection: "row", 
        justifyContent: "flex-end", alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 20, paddingHorizontal: 10}}>
            { token ? 
                <Icon name="home" size={30} onPress={()=>
                navigation.navigate("Contato", {screen: "ContatoFormulario"})}/>
                : <></> }
           <Text style={{fontSize: 30, marginHorizontal: 80,
            flex: 1
           }}>{route.name}</Text>
           <Icon name="user" size={30} onPress={()=>navigation.navigate("Profile")}/>
        </View>
    )
}

export default Cabecalho;