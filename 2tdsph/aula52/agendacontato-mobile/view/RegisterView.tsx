import {View, Text, TextInput, Button, Modal, ActivityIndicator} from 'react-native';
import { useLoginControl } from '../control/loginControl';

interface RegisterProps { 

}

const RegisterView : React.FC<RegisterProps> = () => {
    const {usuario, usuarioErro,
        handleLogin, register, navigateLogin,
        sucesso, mensagem, loading} = useLoginControl();
    return ( 
        <View style={{flex: 1}}>
            <Modal visible={loading} transparent={false}>
                <ActivityIndicator/>
            </Modal>            
            <Text style={{fontSize: 28, fontWeight: "bold"}}>Registro de Usuário</Text>
            <Text>Email: </Text>
            <Text style={{color: "red"}}>{usuarioErro.email}</Text>
            <TextInput value={usuario.email}
            onChangeText={(txt)=>handleLogin(txt, "email")}/>
            <Text>Senha:</Text>
            <Text style={{color: "red"}}>{usuarioErro.senha}</Text>
            <TextInput value={usuario.senha}
                onChangeText={(txt)=>handleLogin(txt, "senha")}
                secureTextEntry={true}/>
            <Button title="Registrar" onPress={register} />
            <Text style={{color: "blue"}} onPress={navigateLogin}>Efetuar o Login</Text>
            <Text style={{fontSize: 18, color: sucesso ? "green": "red"}}>{mensagem}</Text>
        </View>   
    )
}

export {RegisterView};