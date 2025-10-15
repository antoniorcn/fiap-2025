import {View, Text, TextInput, Button, 
    ActivityIndicator, Modal,
    ListRenderItemInfo, Image,
    FlatList} from 'react-native';
import {useContatoControl} from '../control/contatoControl';
import { Contato } from '../model/contato';
import { FontAwesome5 as Icon} from '@expo/vector-icons';
import { ContatoStack, RootScreenNavigationProps } from '../navigation/navigationDefinition';
import { useContext } from 'react';
import { VaiContexto } from '../contexto/vaicontexto';
import { useNavigation } from '@react-navigation/native';

const {Screen, Navigator} = ContatoStack;

const ContatoView = () => { 
    const {contato, contatoLista, contatoErro,
        handleInput, salvar, carregar, apagar, atualizar,
        carregarImageMidia,
        sucesso, loading, mensagem, imagem } = useContatoControl();
    const navigation = useNavigation<RootScreenNavigationProps>();
    return (
        <View style={{flex: 1}}>
            <View>
                <Text>Agenda de Contato</Text>
            </View>
            <Text style={{color: sucesso ? "green": "red", 
                fontSize: 20}}>{mensagem}</Text>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="ContatoFormulario">
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
                <Screen name="ContatoListagem">
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
                                        {item.id && <View>
                                            <Icon name="trash" size={28} color="red"
                                                onPress={()=>{ 
                                                console.log("Apagando id ==> ", item.id)
                                                if (item.id) { 
                                                    apagar( item.id );
                                                }}} 
                                            />
                                            <Icon name="edit" size={28} color="blue"
                                                onPress={()=>{ 
                                                console.log("Atualizando id ==> ", item.id)
                                                if (item.id) { 
                                                    atualizar( item.id );
                                                }}} 
                                            />                                            
                                        </View>}
                                    </View>
                                );
                            }} />
                        </View>
                    }   
                </Screen>
                <Screen name="ContatoImagem">
                    {()=>
                        <View style={{flex: 5}}>
                            <Button title="Carregar Image Library" onPress={carregarImageMidia}/>
                            { imagem != null &&
                            <Image source={{uri: imagem}}
                                style={{flex: 1}}
                            />
                            }
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