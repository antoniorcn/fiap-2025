import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {Button, Text, View, FlatList, ListRenderItemInfo} from 'react-native';
import Carro from './Carro';

const CarroItem = ( props : ListRenderItemInfo<Carro> ) => { 
    return ( 
        <View>
            <Text>Modelo: {props.item.modelo}</Text>
            <Text>Ano: {props.item.ano}</Text>
            <Text>Placa: {props.item.placa}</Text>
        </View>
    );
}

interface CarroListagemProps extends ParamListBase { 
    lista : Carro[]
}
const CarroListagem = ( props : CarroListagemProps ) => { 
    return (
        <View style={{flex: 1}}>
            <FlatList data={props.lista} renderItem={CarroItem}
                keyExtractor={(item) : string =>`ID-${item.id}`} />
            <Button title="Ir para o Formulario" onPress={()=>{
                if ( props.navigation ){ 
                    props.navigation.navigate("CarroFormulario");
                }
            }} />
        </View>
    )
}

export {CarroListagem};