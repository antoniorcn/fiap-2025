import { View, Text, Button, TextInput, ActivityIndicator, Modal } from "react-native";
import { useUsuarioControl } from "../control/usuarioControl";
import { useContext } from "react";
import { VaiContexto } from "../contexto/vaicontexto";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNavigationProps } from "../navigation/navigationDefinition";

interface ProfileProps { 
}

const ProfileView  : React.FC<ProfileProps> = ( props ) => { 
    const { email } = useContext(VaiContexto);
    const navigation = useNavigation<RootScreenNavigationProps>();

    return (
        <View style={{flex: 1}}>
            <View>
                <Text>Profile</Text>
            </View>
            <View style={{flex: 3}}>
                <Text>Email: {email}</Text>
                <Button title="Logout" onPress={()=> {
                    // fecharSessao();
                    navigation.navigate("Login");
                    }}/>
            </View>
        </View>
    );
}

export default ProfileView;