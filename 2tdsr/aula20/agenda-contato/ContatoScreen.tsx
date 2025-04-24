import React, {useState} from 'react';
import { Alert, View, Text } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ContatoFormulario } from './ContatoFormulario';
import { ContatoListagem } from './ContatoListagem';
import Contato from './Contato';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {Screen, Navigator} = createBottomTabNavigator();

interface ContatoScreenProps extends ParamListBase { 

}

const ContatoScreen = (props : ContatoScreenProps) :
     React.ReactElement => { 

    const [lista, setLista] = useState<Contato[]>([]);

    const gravar = ( contato : Contato ) => { 
        setLista( ( listaAntiga : Contato[]) => {
            const listaNova = [ ...listaAntiga, contato ];

            const strListaNova = JSON.stringify( listaNova );

            AsyncStorage.setItem("CONTATO-LISTA", strListaNova);

            return listaNova;
        } );
        Alert.alert("Contato gravado com sucesso");
    }

    return ( 
        <View style={{flex: 1}}>
            <Navigator>
                <Screen name="ContatoFormulario"
                    options={{
                        title: "Formulario",
                        headerShown: false
                    }}>
                       {( navProps : ParamListBase )=><ContatoFormulario {...navProps} onGravar={gravar}   />}
                
                </Screen>
                <Screen name="ContatoListagem" >
                    {( navProps : ParamListBase )=>
                            <ContatoListagem {...navProps} lista={lista} />}
                </Screen>
            </Navigator>
        </View>
    );
}

export {ContatoScreen}