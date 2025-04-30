import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Carro from './Carro';
import { CarroFormulario } from './CarroFormulario';
import { ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CarroListagem } from './CarroListagem';

const Stack = createStackNavigator();

interface CarroScreenProps extends ParamListBase { 

}

const CarroScreen = (props : CarroScreenProps) => { 

    const [lista, setLista] = useState<Carro[]>([]);

    const gravar = (ano : number, placa : string, modelo : string) : void => { 
        const carro : Carro = {id : lista.length + 1, ano, placa, modelo};
        setLista( [ ...lista, carro ] );
    }

    return (
        <View style={{flex: 1}}>
            <Text>Gestão de Carros</Text>
            <Stack.Navigator>
                <Stack.Screen name="CarroFormulario">
                    {( navProps : ParamListBase )=>
                        <CarroFormulario {...navProps} onGravar={gravar}/>}
                </Stack.Screen>
                <Stack.Screen name="CarroListagem">
                    {( navProps : ParamListBase )=>
                        <CarroListagem {...navProps} lista={lista}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    )

}

export {CarroScreen}