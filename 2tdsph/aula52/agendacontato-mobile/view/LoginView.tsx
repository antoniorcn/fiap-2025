import {View, Text, TextInput, Button, Modal, ActivityIndicator} from 'react-native';
import { useLoginControl } from '../control/loginControl';

interface LoginProps { 

}

const LoginView : React.FC<LoginProps> = () => {
    const {usuario, usuarioErro,
        handleLogin, login, navigateRegister,
        sucesso, mensagem, loading} = useLoginControl();
    return ( 
        <View style={{flex: 1}}>
            <Modal visible={loading} transparent={false}>
                <ActivityIndicator/>
            </Modal>
            <Text style={{fontSize: 28, fontWeight: "bold"}}>Login</Text>
            <Text>Email: </Text>
            <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
            <TextInput value={usuario.email}
            onChangeText={(txt)=>handleLogin(txt, "email")}/>
            <Text>Senha:</Text>
            <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
            <TextInput value={usuario.senha}
                onChangeText={(txt)=>handleLogin(txt, "senha")}
                secureTextEntry={true}/>
            <Button title="Login" onPress={login} />
            <Text style={{color: "blue"}} onPress={navigateRegister}>Registrar-se</Text>
            <Text style={{fontSize: 18, color: sucesso ? "green": "red"}}>{mensagem}</Text>
        </View>   
    )
}

export {LoginView};