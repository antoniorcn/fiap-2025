import { View, Text, Button, TextInput, ActivityIndicator, Modal } from "react-native";
import { useUsuarioControl } from "../control/usuarioControl";

interface LoginProps { 
}

const LoginView  : React.FC<LoginProps> = ( props ) => { 
    const {usuario, usuarioErro,
        handleInput, logar, navegarRegistro,
        sucesso, loading, mensagem } = useUsuarioControl();

    return (
        <View style={{flex: 1}}>
            <View>
                <Text>Login</Text>
            </View>
            <Text style={{color: sucesso ? "green": "red", 
                fontSize: 20}}>{mensagem}</Text>
            <View style={{flex: 3}}>
                <Text>Email: </Text>
                <Text style={{color: "red"}}>{usuarioErro.email}</Text>
                <TextInput value={usuario.email} 
                    onChangeText={(texto : string)=>handleInput(texto, "email")}/>
                <Text>Senha: </Text>
                <Text style={{color: "red"}}>{usuarioErro.senha} </Text>
                <TextInput value={usuario.senha} secureTextEntry={true}
                    onChangeText={(txt : string)=>handleInput(txt, "senha")}/>
                <Button title="Login" onPress={logar}/>
                <Text style={{color: "blue"}} 
                    onPress={navegarRegistro}>Criar Conta</Text>
            </View>
            <Modal style={{flex: 1}} visible={loading}>
                <ActivityIndicator size={60}/>
            </Modal>
        </View>
    );
}

export default LoginView;