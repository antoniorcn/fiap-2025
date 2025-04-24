import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';

interface ContatoListagemProps extends ParamListBase { 

}

const ContatoListagem = (props : ContatoListagemProps) :
 React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Contato Listagem </Text>
        </View>
    )
}

export {ContatoListagem}