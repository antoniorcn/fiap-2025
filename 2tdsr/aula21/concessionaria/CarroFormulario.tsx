import { ParamListBase } from '@react-navigation/native';
import React, { useState } from 'react';
import {Button, View, Text, TextInput} from 'react-native';

interface CarroFormularioProps extends ParamListBase { 
    onGravar : ( ano : number, placa : string, modelo : string ) => void
}

const CarroFormulario = ( props : CarroFormularioProps ) => {
    const [ano, setAno] = useState<string>("2025");
    const [placa, setPlaca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");

    return ( 
        <View style={{flex: 1}}>
            <TextInput value={ano} onChangeText={setAno} placeholder="Ano"/>
            <TextInput value={placa} onChangeText={setPlaca} placeholder="Placa"/>
            <TextInput value={modelo} onChangeText={setModelo} placeholder="Modelo"/>
            <Button title="Gravar" onPress={()=>{
                props.onGravar(parseInt(ano), placa, modelo);
            }}/>
            <Button title="Ir para a Listagem" onPress={()=>{
                if ( props.navigation ){ 
                    props.navigation.navigate("CarroListagem");
                }
            }} />
        </View>
    )
}

export {CarroFormulario}