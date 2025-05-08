import React, {useState, useEffect} from 'react';
import { View, ToastAndroid } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContatoFormulario } from './ContatoFormulario';
import { ContatoListagem } from './ContatoListagem';
import Contato from './Contato';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import {FontAwesome5} from '@expo/vector-icons';

import { apiRest } from './apiRest';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoScreenProps extends ParamListBase { 

}

const ContatoScreen = (props : ContatoScreenProps) :
     React.ReactElement => { 

    const [lista, setLista] = useState<Contato[]>([]);

    const gravar = ( contato : Contato ) => { 
        apiRest.post("/contatos.json", contato)
        .then(()=>{
            ToastAndroid.show("Contato gravado com sucesso", ToastAndroid.LONG);
            lerDados();
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao gravar o contato", ToastAndroid.LONG);
        })
        
    }

    const remover = ( id : string ) => { 
        apiRest.delete(`/contatos/${id}.json`)
        .then(()=>{
            ToastAndroid.show("Contato removido com sucesso", ToastAndroid.LONG);
            lerDados();
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao remover o contato", ToastAndroid.LONG);
        })
    }

    const lerDados = () => { 
        apiRest.get("/contatos.json")
        .then(( info : AxiosResponse<any, any> )=>{
            const listaContatos : Contato[] = [];
            for (const chave in info.data) { 
                const contato = info.data[chave];
                contato.id = chave;
                listaContatos.push( contato );
            }
            setLista( listaContatos );
            ToastAndroid.show( `Foram carregados ${listaContatos.length} contatos`, 
                ToastAndroid.LONG );
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao carregar os contatos da lista", 
                ToastAndroid.LONG );
        })
    }

    useEffect(()=>{
        lerDados();
    }, [])

    return ( 
        <View style={{flex: 1}}>
            <Navigator>
                <Screen name="ContatoFormulario"
                    options={{
                        title: "Formulario",
                        headerShown: false,
                        tabBarIcon: ({size, color, focused})=>
                            <FontAwesome5 name="edit" size={size} color={color}/>
                    }}>
                       {( navProps : ParamListBase )=><ContatoFormulario {...navProps} onGravar={gravar}   />}
                
                </Screen>
                <Screen name="ContatoListagem" 
                    options= {{
                        title: "Listagem",
                        headerShown: false,
                        tabBarIcon: ({size, color, focused})=>
                            <FontAwesome5 name="list" size={size} color={color}/>
                    }}>
                    {( navProps : ParamListBase )=>
                            <ContatoListagem {...navProps} lista={lista} onRemover={remover} />}
                </Screen>
            </Navigator>
        </View>
    );
}

export {ContatoScreen}