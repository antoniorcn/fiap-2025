import {View, Text, Button, TextInput, ActivityIndicator, Modal} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';
import { useContext } from 'react';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { PrincipalStackNavigationProp } from '../navegacao/navigationDefinition';
import { useNavigation } from '@react-navigation/native';

const LoginView : React.FC<any> = ( 
    props : any ) => { 
         
    const {email, fecharSessao} = useContext(ContextoPrincipal);
    const navigation = useNavigation<PrincipalStackNavigationProp>();
    return (
        <View style={{flex: 1}}>
            <Text style={{fontSize: 28}}>Profile</Text>
            <View style={{flex: 1}}>
                <Text>Email:{email}</Text>
                <Button title="Logout" onPress={()=>{
                    fecharSessao();
                    navigation.navigate("Login");
                }} />
            </View>
        </View>
    );
}

export default LoginView;