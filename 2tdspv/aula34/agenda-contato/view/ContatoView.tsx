import {View, Text, TextInput, Button, 
    ActivityIndicator, Modal, useWindowDimensions} from 'react-native';
import {useContatoControl} from '../control/contatoControl';
const ContatoView = () => { 
    const {contato, handleInput, salvar,
        loading, mensagem} = useContatoControl();
    const {fontScale, width, height} = useWindowDimensions();
    return (
        <View style={{flex: 1}}>
            {/* <View style={{position: "absolute",
                left: (width - 50), width: 50, height: 50, top: 10,
                backgroundColor: "blue"}}></View> */}
            <Text>Agenda de Contato</Text>
            <Text>Tela</Text>
            <Text>Width: {width}</Text>
            <Text>Height: {height}</Text>
            <Text>Nome: </Text>
            <TextInput value={contato.nome} 
                onChangeText={(texto : string)=>handleInput(texto, "nome")}/>
            <Text>Email: </Text>
            <TextInput value={contato.email} 
                onChangeText={(txt : string)=>handleInput(txt, "email")}/>
            <Text>Telefone: </Text>
            <TextInput value={contato.telefone} 
                onChangeText={(txt : string)=>handleInput(txt, "telefone")}/>
            <Button title="Salvar" onPress={salvar}/>
            <Text style={{color: "red", fontSize: 20}}>{mensagem}</Text>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
        </View>
    );
}

export default ContatoView;