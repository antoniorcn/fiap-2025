import {View, Text, TextInput, Button} from 'react-native';
import { useLoginControl } from '../control/loginControl';

interface LoginProps { 

}

const LoginView : React.FC<LoginProps> = () => {
    const {usuario, handleLogin, login,
        sucesso, mensagem, loading} = useLoginControl();
    return ( 
        <View style={{flex: 1}}>
            <Text>Email: </Text>
            <TextInput value={usuario.email}
            onChangeText={(txt)=>handleLogin(txt, "email")}/>
            <Text>Senha:</Text>
            <TextInput value={usuario.senha}
                onChangeText={(txt)=>handleLogin(txt, "senha")}
                secureTextEntry={true}/>
            <Button title="Login" onPress={login} />
            <Text style={{fontSize: 18, color: sucesso ? "green": "red"}}>{mensagem}</Text>
        </View>   
    )
}

export {LoginView};