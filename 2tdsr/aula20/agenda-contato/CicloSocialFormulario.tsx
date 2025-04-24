import { ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import CicloSocial from './CicloSocial';

interface CicloSocialFormularioProps extends ParamListBase { 
    onGravar : ( cicloSocial : CicloSocial ) => void
}

const CicloSocialFormulario = (props : CicloSocialFormularioProps) :
 React.ReactElement => { 
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    return ( 
        <View style={{flex: 1}}>
            <Text> Ciclo Social Formulario </Text>
            <TextInput value={nome} onChangeText={setNome} placeholder="Nome"/>
            <TextInput value={descricao} onChangeText={setDescricao} placeholder="Descricao"/>
            <Button title="Gravar" onPress={()=>{
                const cicloSocial = { nome, descricao };
                props.onGravar( cicloSocial );
            }}/>
        </View>
    )
}

export {CicloSocialFormulario}