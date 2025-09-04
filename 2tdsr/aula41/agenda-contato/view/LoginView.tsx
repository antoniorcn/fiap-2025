import {View, Text, Button, TextInput, ActivityIndicator, Modal} from 'react-native';
import { useUsuarioControl } from '../control/usuarioControl';

const LoginView : React.FC<any> = ( 
    props : any ) => { 
         
    const { loading, usuario,
        handlerInput, logar,
        mensagem, usuarioErro, status} = useUsuarioControl();
    return (
        <View style={{flex: 1}}>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
            <Text style={{color: status == "erro"? "red" : "green", 
                    fontSize: 24}}>{mensagem}</Text>
            
            <View style={{flex: 1}}>
                <Text>Email:</Text>
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput value={usuario.email}
                    onChangeText={(txt:string)=>handlerInput(txt, "email")}/>
                <Text>Senha:</Text>
                <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
                <TextInput value={usuario.senha} secureTextEntry={true}
                    onChangeText={(txt:string)=>handlerInput(txt, "senha")}/>
                <Text>Email:</Text>
                <Button title="Sigin" onPress={logar} />
            </View>
        </View>
    );
}

export default LoginView;