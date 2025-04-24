import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {FlatList, View, Text, ListRenderItemInfo} from 'react-native';
import CicloSocial from './CicloSocial';

const CicloSocialItem = ( props : ListRenderItemInfo<CicloSocial> ) : 
    React.ReactElement => { 
    return (
        <View style={{
                backgroundColor: "antiquewhite", padding: 8,
                borderColor: "red", borderWidth: 1, borderRadius: 16}}>
            <Text>{props.item.nome}</Text>
            <Text>{props.item.descricao}</Text>
        </View>
    )
}

interface CicloSocialListagemProps extends ParamListBase { 
    lista : CicloSocial[]
}
const CicloSocialListagem = (props : CicloSocialListagemProps) :
 React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Ciclo Social Listagem </Text>
            <FlatList data={props.lista} renderItem={CicloSocialItem}/>
        </View>
    )
}

export {CicloSocialListagem}