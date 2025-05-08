import React, {useEffect, useState} from 'react';
import { Alert, View, Text, ToastAndroid } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CicloSocialFormulario } from './CicloSocialFormulario';
import { CicloSocialListagem } from './CicloSocialListagem';
import CicloSocial from './CicloSocial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import { apiRest } from './apiRest';

const {Screen, Navigator} = createBottomTabNavigator();

interface CicloSocialScreenProps extends ParamListBase { 

}

const CicloSocialScreen = (props : CicloSocialScreenProps) :
     React.ReactElement => { 

    const [lista, setLista] = useState<CicloSocial[]>([]);

    const gravar = ( cicloSocial : CicloSocial ) => { 
        apiRest.post("/cicloSocial.json", cicloSocial)
        .then(()=>{
            ToastAndroid.show("CicloSocial gravado com sucesso", 
                ToastAndroid.LONG);
            lerDados();
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao gravar o CicloSocial", 
                ToastAndroid.LONG);
        })
    }

    const remover = ( id : string ) => { 
        apiRest.delete(`/cicloSocial/${id}.json`)
        .then(()=>{
            ToastAndroid.show("Ciclo Social removido com sucesso", ToastAndroid.LONG);
            lerDados();
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao remover o Ciclo Social", ToastAndroid.LONG);
        })
    }    

    const lerDados = () => { 
        apiRest.get("/cicloSocial.json")
        .then(( info : AxiosResponse<any, any> )=>{
            const listaCicloSocial : CicloSocial[] = [];
            for (const chave in info.data) { 
                const cicloSocial = info.data[chave];
                cicloSocial.id = chave;
                listaCicloSocial.push( cicloSocial );
            }
            setLista( listaCicloSocial );
            ToastAndroid.show( `Foram carregados ${listaCicloSocial.length} Ciclos Sociais`, 
                ToastAndroid.LONG );
        })
        .catch(()=>{
            ToastAndroid.show("Erro ao carregar os Ciclos Sociais da lista", 
                ToastAndroid.LONG );
        })
    } 

    
    useEffect(()=>{
        lerDados();
    }, [])
    

    return ( 
        <View style={{flex: 1}}>
            <Navigator>
                <Screen name="CicloSocialFormulario"
                    options={{
                        title: "Formulario",
                        headerShown: false
                    }}>
                       {( navProps : ParamListBase )=>
                        <CicloSocialFormulario {...navProps} onGravar={gravar}   />}
                
                </Screen>
                <Screen name="CicloSocialListagem" >
                    {( navProps : ParamListBase )=>
                            <CicloSocialListagem {...navProps} lista={lista} 
                                onRemover={remover}/>}
                </Screen>
            </Navigator>
        </View>
    );
}

export {CicloSocialScreen}