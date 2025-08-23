import {View, Text, TextInput, Button, 
    ActivityIndicator, Modal, useWindowDimensions} from 'react-native';
import {useContatoControl} from '../control/contatoControl';
const ContatoView = () => { 
    const {contato, handleInput, salvar,
        sucesso, loading, mensagem, contatoErro} = useContatoControl();
    const {fontScale, width, height} = useWindowDimensions();
    return (
        <View style={{flex: 1}}>
            <Text>Agenda de Contato</Text>
            <Text>Tela</Text>
            <Text>Width: {width}</Text>
            <Text>Height: {height}</Text>
            <Text>Nome: </Text>
            <Text style={{color: "red"}}>{contatoErro.nome}</Text>
            <TextInput value={contato.nome} 
                onChangeText={(texto : string)=>handleInput(texto, "nome")}/>
            <Text>Email: </Text>
            <Text style={{color: "red"}}>{contatoErro.email} </Text>
            <TextInput value={contato.email} 
                onChangeText={(txt : string)=>handleInput(txt, "email")}/>
            <Text>Telefone: </Text>
            <Text style={{color: "red"}}>{contatoErro.telefone}</Text>
            <TextInput value={contato.telefone} 
                onChangeText={(txt : string)=>handleInput(txt, "telefone")}/>
            <Button title="Salvar" onPress={salvar}/>
            <Text style={{color: sucesso ? "green": "red", 
                fontSize: 20}}>{mensagem}</Text>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
        </View>
    );
}

export default ContatoView;