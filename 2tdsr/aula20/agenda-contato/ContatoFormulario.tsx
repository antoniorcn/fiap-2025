import { ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import Contato from './Contato';

interface ContatoFormularioProps extends ParamListBase { 
    onGravar : ( contato : Contato ) => void
}

const ContatoFormulario = (props : ContatoFormularioProps) :
 React.ReactElement => { 
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    return ( 
        <View style={{flex: 1}}>
            <Text> Contato Formulario </Text>
            <TextInput value={nome} onChangeText={setNome} placeholder="Nome"/>
            <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone"/>
            <TextInput value={email} onChangeText={setEmail} placeholder="Email"/>
            <Button title="Gravar" onPress={()=>{
                const contato = { nome, telefone, email };
                props.onGravar( contato );
            }}/>
        </View>
    )
}

export {ContatoFormulario}