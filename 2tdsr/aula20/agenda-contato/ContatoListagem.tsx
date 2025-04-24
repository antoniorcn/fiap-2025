import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {FlatList, View, Text, ListRenderItemInfo} from 'react-native';
import Contato from './Contato';

const ContatoItem = ( props : ListRenderItemInfo<Contato> ) : 
    React.ReactElement => { 
    return (
        <View style={{
                backgroundColor: "antiquewhite", padding: 8,
                borderColor: "red", borderWidth: 1, borderRadius: 16}}>
            <Text>{props.item.nome}</Text>
            <Text>{props.item.telefone}</Text>
            <Text>{props.item.email}</Text>
        </View>
    )
}

interface ContatoListagemProps extends ParamListBase { 
    lista : Contato[]
}
const ContatoListagem = (props : ContatoListagemProps) :
 React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Contato Listagem </Text>
            <FlatList data={props.lista} renderItem={ContatoItem}/>
        </View>
    )
}

export {ContatoListagem}