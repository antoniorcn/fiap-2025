import { View, Text, Button, TextInput, ActivityIndicator, Modal } from "react-native";
import { useUsuarioControl } from "../control/usuarioControl";

const LoginView = () => { 
    const {usuario, usuarioErro,
        handleInput, logar,
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
                <Text>Telefone: </Text>
                <Button title="Salvar" onPress={logar}/>
            </View>
            <Modal style={{flex: 1}} visible={loading}>
                <ActivityIndicator size={60}/>
            </Modal>
        </View>
    );
}

export default LoginView;