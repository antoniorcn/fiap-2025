import {View, Text, TextInput, Button, 
    ActivityIndicator, Modal, useWindowDimensions,
    ListRenderItemInfo,
    FlatList} from 'react-native';
import {useContatoControl} from '../control/contatoControl';
import { Contato } from '../model/contato';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Screen, Navigator} = createBottomTabNavigator();

const ContatoView = () => { 
    const {contato, contatoLista, handleInput, salvar, carregar, 
        sucesso, loading, mensagem, contatoErro} = useContatoControl();
    const {fontScale, width, height} = useWindowDimensions();
    return (
        <View style={{flex: 1}}>
            <View>
                <Text>Agenda de Contato</Text>
            </View>
            <Text style={{color: sucesso ? "green": "red", 
                fontSize: 20}}>{mensagem}</Text>
            <Navigator>
                <Screen name="Formulario Contato">
                    { () => 
                    <View style={{flex: 3}}>
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
                    </View>
                    }
                </Screen>
                <Screen name="Listagem">
                    {()=>
                        <View style={{flex: 5}}>
                            <Button title="Carregar" onPress={carregar}/>
                            <FlatList data={contatoLista} style={{flex: 1}}
                                renderItem={( { item } : ListRenderItemInfo<Contato> )=>{
                                return (
                                    <View style={{backgroundColor: "lightyellow", borderColor: "red", 
                                    borderWidth: 1, padding: 5, margin: 5}}>
                                        <Text>{item.nome}</Text>
                                        <Text>{item.telefone}</Text>
                                        <Text>{item.email}</Text>
                                    </View>
                                );
                            }} />
                        </View>
                    }   
                </Screen>
            </Navigator>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
        </View>
    );
}

export default ContatoView;