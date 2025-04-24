import React, {useState} from 'react';
import { Alert, View, Text } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CicloSocialFormulario } from './CicloSocialFormulario';
import { CicloSocialListagem } from './CicloSocialListagem';
import CicloSocial from './CicloSocial';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Screen, Navigator} = createBottomTabNavigator();

interface CicloSocialScreenProps extends ParamListBase { 

}

const CicloSocialScreen = (props : CicloSocialScreenProps) :
     React.ReactElement => { 

    const [lista, setLista] = useState<CicloSocial[]>([]);

    const gravar = ( cicloSocial : CicloSocial ) => { 
        setLista( ( listaAntiga : CicloSocial[]) => {
            const listaNova = [ ...listaAntiga, cicloSocial ];

            const strListaNova = JSON.stringify( listaNova );

            AsyncStorage.setItem("CICLOSOCIAL-LISTA", strListaNova);

            return listaNova;
        } );
        Alert.alert("Ciclo Social gravado com sucesso");
    }

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
                            <CicloSocialListagem {...navProps} lista={lista} />}
                </Screen>
            </Navigator>
        </View>
    );
}

export {CicloSocialScreen}