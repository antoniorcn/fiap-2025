import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {FlatList, View, Text, ListRenderItemInfo, Pressable} from 'react-native';
import CicloSocial from './CicloSocial';
import {FontAwesome5} from '@expo/vector-icons';

interface CicloSocialItemProps extends ListRenderItemInfo<CicloSocial> {
    onRemover : ( id : string ) => void
}

const CicloSocialItem = ( props : CicloSocialItemProps ) : 
    React.ReactElement => { 
    return (
        <View style={{
                backgroundColor: "antiquewhite", padding: 8,
                borderColor: "red", borderWidth: 1, borderRadius: 16,
                flexDirection: "row"}}>
            <View style={{flex: 3}}>
                <Text>{props.item.nome}</Text>
                <Text>{props.item.descricao}</Text>
            </View>
            <View style={{flex: 1}}>
                <Pressable onPress={()=>{
                    props.onRemover( props.item.id )
                }}>
                    <FontAwesome5 name="trash" size={28}/>
                </Pressable>
            </View>
        </View>
    )
}

interface CicloSocialListagemProps extends ParamListBase { 
    lista : CicloSocial[]
    onRemover : ( id : string ) => void
}
const CicloSocialListagem = (props : CicloSocialListagemProps) :
 React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Ciclo Social Listagem </Text>
            <FlatList data={props.lista} 
                renderItem={( flatProps : any ) => 
                    <CicloSocialItem {...flatProps} 
                        onRemover={props.onRemover}/>}/>
        </View>
    )
}

export {CicloSocialListagem}