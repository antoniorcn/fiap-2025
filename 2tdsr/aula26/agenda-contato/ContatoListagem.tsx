import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {FlatList, View, Text, ListRenderItemInfo, Pressable, ToastAndroid} from 'react-native';
import Contato from './Contato';
import {FontAwesome5} from '@expo/vector-icons';

interface ContatoItemProps extends ListRenderItemInfo<Contato> { 
    onRemover : ( id : string ) => void
}

const ContatoItem = ( props : ContatoItemProps ) : 
    React.ReactElement => { 
    return (
        <View style={{
                backgroundColor: "antiquewhite", padding: 8,
                borderColor: "red", borderWidth: 1, borderRadius: 16,
                flexDirection: "row"}}>
            <View style={{flex: 3}}>
                <Text>{props.item.nome}</Text>
                <Text>{props.item.telefone}</Text>
                <Text>{props.item.email}</Text>
            </View>
            <View style={{flex: 1, 
                justifyContent: "center", alignItems: "center"}}>
                <Pressable onPress={()=>{
                    if (props.item.id) {
                        props.onRemover( props.item.id );
                    }
                }}>
                    <FontAwesome5 name="trash" size={28} color="black"/>
                </Pressable>
            </View>
        </View>
    )
}

interface ContatoListagemProps extends ParamListBase { 
    lista : Contato[]
    onRemover : ( id : string ) => void
}
const ContatoListagem = (props : ContatoListagemProps) :
 React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Contato Listagem </Text>
            <FlatList data={props.lista} 
                renderItem={(flatListProps : any)=>
                    <ContatoItem {...flatListProps} 
                                onRemover={props.onRemover}/>}/>
        </View>
    )
}

export {ContatoListagem}