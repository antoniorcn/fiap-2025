import { useContext } from "react";
import {View, Text} from "react-native";
import {FontAwesome6 as Icon} from "@expo/vector-icons";
import { StackHeaderProps } from '@react-navigation/stack';
import { VaiContexto } from '../contexto/vaicontexto';

const TopBar : React.FC<StackHeaderProps> = ( props ) => { 
    const {token} = useContext(VaiContexto)
    return ( 
        <View style={{backgroundColor: "white", padding: 20,
            flexDirection: "row", justifyContent: "space-between"
        }}>
            {token && <Icon name="house" size={36} onPress={()=>{
                props.navigation.navigate("Contato", {screen: "ContatoFormulario"});
            }}/> }
            <Text style={{fontSize: 28, 
                textAlign: "center"}}>{props.route.name}</Text>
            {token && <Icon name="user" size={36} onPress={()=>{
                props.navigation.navigate("Perfil");
            }}/> }
        </View>
    )
}

export default TopBar;