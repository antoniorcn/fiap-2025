import { FC, ReactElement } from 'react';
import {View, Text, TextInput, Button, Modal, ActivityIndicator, FlatList, FlatListComponent, ListRenderItemInfo, ListRenderItem} from 'react-native';
import { useContatoControl } from '../control/contatoControl';
import { Contato } from '../model/Contato';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoViewProps { 

}

const ContatoView: FC<ContatoViewProps> = ( props ) => {
    const {loading, mensagem, sucesso,
        contato, contatoErro, contatoLista,
        handleContato, salvar, ler, apagar, atualizar } = useContatoControl();
    return (
        <View style={{flex: 1}}>
            <Text style={{color: sucesso ? "green" : "red", 
                fontSize: 24}}>{mensagem}</Text>
            <Navigator>
                <Screen name="ContatoFormulario">
                    { ()=> { return (
                    <View style={{flex: 1}}>
                        <Text>Nome: </Text>
                        <Text style={{color: "red"}}>{contatoErro.nome}</Text>
                        <TextInput value={contato.nome} 
                            onChangeText={(txt : string) => handleContato(txt, "nome")}/>
                        <Text>Telefone: </Text>
                        <Text style={{color: "red"}}>{contatoErro.telefone}</Text>
                        <TextInput value={contato.telefone} 
                            onChangeText={(txt : string) => handleContato(txt, "telefone")}/>
                        <Text>Email: </Text>
                        <Text style={{color: "red"}}>{contatoErro.email}</Text>
                        <TextInput value={contato.email} 
                            onChangeText={(txt : string) => handleContato(txt, "email")}/>
                        <Button title="Salvar" onPress={salvar}/>
                    </View>
                    )}}
                </Screen>
                <Screen name="ContatoLista">
                    {()=>{return (
                        <View style={{flex: 1}}>
                            <Button title="Ler Contatos" onPress={ler}/>
                            <FlatList style={{flex: 1}} data={contatoLista} renderItem={
                                ( {item} : ListRenderItemInfo<Contato> ) : ReactElement =>{
                                    return (
                                    <View style={{backgroundColor: "lightyellow",
                                        borderColor: "red", borderWidth: 1, padding: 5,
                                        margin: 10
                                    }}> 
                                        <Text>Nome: {item.nome}</Text>
                                        <Text>Telefone: {item.telefone}</Text>
                                        <Text>Email: {item.email}</Text>
                                        <Icon name="trash" size={20} color="red"
                                            onPress={()=>apagar( item.id )}/>
                                        <Icon name="edit" size={20} color="blue"
                                            onPress={()=>atualizar( item.id )}/>
                                    </View>)
                            }}/> 
                        </View>
                    )}}
                </Screen>
            </Navigator>           
            <Modal visible={loading} transparent={false}>
                <ActivityIndicator/>
            </Modal>
        </View>
    );
}

export { ContatoView };