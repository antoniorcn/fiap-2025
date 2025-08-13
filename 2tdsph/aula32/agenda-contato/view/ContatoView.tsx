import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator} from 'react-native';
import { useContatoControl } from '../control/contatoControl';

interface ContatoViewProps { 

}

const ContatoView: FC<ContatoViewProps> = ( props ) => {
    const {loading, erro, salvar, 
        contato, handleContato} = useContatoControl();
    return (
        <View style={{flex: 1}}>
            <Text>Nome: </Text>
            <TextInput value={contato.nome} 
                onChangeText={(txt : string) => handleContato(txt, "nome")}/>
            <Text>Telefone: </Text>
            <TextInput value={contato.telefone} 
                onChangeText={(txt : string) => handleContato(txt, "telefone")}/>
            <Text>Email: </Text>
            <TextInput value={contato.email} 
                onChangeText={(txt : string) => handleContato(txt, "email")}/>
            <Button title="Salvar" onPress={salvar}/>
            <Text style={{color: "red"}}>{erro}</Text>
            <Modal visible={loading} transparent={false}>
                <ActivityIndicator/>
            </Modal>

        </View>
    );
}

export { ContatoView };