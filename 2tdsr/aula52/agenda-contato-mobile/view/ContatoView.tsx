import {View, Text, Button, TextInput, 
    ActivityIndicator, Modal, FlatList, ListRenderItemInfo,
    Image} from 'react-native';
import { useContatoControl } from '../control/contatoControl';
import { Contato } from '../model/contato';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome6 as Icon } from '@expo/vector-icons';
import { ContatoNavigator } from '../navegacao/navigationDefinition';

const {Screen, Navigator} = ContatoNavigator;

interface ContatoViewProps { }

const ContatoView : React.FC<ContatoViewProps> = ( 
    props ) => { 
         
    const navigation = useNavigation();
    const { loading, contato, contatoLista, 
        handlerInput, salvar, carregar, apagar, atualizar,
        carregarImageMediaLibrary, carregarImageCamera,
        mensagem, contatoErro, status, photo} = useContatoControl( navigation );
    // const photoBase64 = "data:image/png;base64," + photo;
    const photoBase64 = photo;
    // console.log("Photo Carregada ==> ", photoBase64);
    console.log( contatoLista );
    return (
        <View style={{flex: 1}}>
            <Modal visible={loading}>
                <ActivityIndicator size="large"/>
            </Modal>
            <Text style={{fontSize: 28}}>Gestão de Contatos</Text>
            <Text style={{color: status == "erro"? "red" : "green", 
                    fontSize: 24}}>{mensagem}</Text>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="ContatoFormulario">
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
                <Screen name="ContatoListagem">
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
                                    <Icon name="trash" size={24} color="red" 
                                        onPress={()=>item.id && apagar(item.id)}/>
                                    <Icon name="edit" size={24} color="blue" 
                                        onPress={()=>item.id && atualizar(item.id)}/>
                                </View>
                            }/>
                        </View>
                    }
                </Screen>
                <Screen name="ContatoImagem">
                    { ()=>
                        <View style={{flex: 2}}>
                            <Button title="Carregar Foto" onPress={carregarImageMediaLibrary} />
                            
                            <Button title="Camera" onPress={carregarImageCamera} />
                            { /*<Image style={{flex: 1}} source={{uri: photoBase64!!}} />*/}
                            <Image style={{flex: 1}} source={{uri: photoBase64!!}} />
                        </View>
                    }
                </Screen>
            </Navigator>
        </View>
    );
}

export default ContatoView;