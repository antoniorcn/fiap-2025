import {View, Text, Button, TextInput, ActivityIndicator, Modal, FlatList, ListRenderItemInfo} from 'react-native';
import { useContatoControl } from '../control/contatoControl';
import { Contato } from '../model/contato';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoViewProps { 
    
}

const ContatoView : React.FC<ContatoViewProps> = () => { 
    const { loading, contato, contatoLista, 
        handlerInput, salvar, carregar, 
        mensagem, contatoErro, status} = useContatoControl();
    return (
        <View style={{flex: 1}}>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
            <Text style={{color: status == "erro"? "red" : "green", 
                    fontSize: 24}}>{mensagem}</Text>
            <Navigator>
                <Screen name="Formulario">
                    {()=>
                        <View style={{flex: 1}}>
                            <Text>Nome:</Text>
                            <Text style={{color: "red"}}>{contatoErro.nome}</Text>
                            <TextInput value={contato.nome}
                                onChangeText={(txt:string)=>handlerInput(txt, "nome")}/>
                            <Text>Telefone:</Text>
                            <Text style={{color: "red"}}>{contatoErro.telefone}</Text>
                            <TextInput value={contato.telefone} 
                                onChangeText={(txt:string)=>handlerInput(txt, "telefone")}/>
                            <Text>Email:</Text>
                            <Text style={{color: "red"}}>{contatoErro.email}</Text>
                            <TextInput value={contato.email} 
                                onChangeText={(txt:string)=>handlerInput(txt, "email")}/>
                            <Button title="Salvar" onPress={salvar} />
                        </View>
                    }
                </Screen>
                <Screen name="Listagem">
                    { ()=>
                        <View style={{flex: 2}}>
                            <Button title="Carregar Contatos" onPress={carregar} />
                            <FlatList data={contatoLista} renderItem={
                                ({item} : ListRenderItemInfo<Contato>)=>
                                <View style={{backgroundColor: "lightyellow",
                                    padding: 5, margin: 5, 
                                    borderColor: "red", borderWidth: 1
                                }}>
                                    <Text>{item.nome}</Text>
                                    <Text>{item.telefone}</Text>
                                    <Text>{item.email}</Text>
                                </View>
                            }/>
                        </View>
                    }
                </Screen>
            </Navigator>
        </View>
    );
}

export default ContatoView;