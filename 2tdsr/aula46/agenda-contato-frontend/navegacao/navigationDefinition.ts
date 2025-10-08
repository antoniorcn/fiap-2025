/*
    (Stack Navigation)          (Tab Navigation)
    Navegação Principal         Navegacao Contato

    Login                       ContatoFormulario
    Registrar                   ContatoLista
    Contato                     
    Carros

*/

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigatorScreenParams} from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

type PrincipalStackParamList = { 
    Login: undefined;
    Registrar : undefined;
    Profile : undefined;
    Contato : NavigatorScreenParams<ContatoStackParamList>;
}

type ContatoStackParamList = { 
    ContatoFormulario: undefined;
    ContatoListagem : undefined;
}

const ContatoNavigator = createBottomTabNavigator<ContatoStackParamList>();
const PrincipalNavigator = createStackNavigator<PrincipalStackParamList>();

type PrincipalStackNavigationProp = StackNavigationProp<PrincipalStackParamList, "Login">;
type ContatoBottomTabNavigationProp = BottomTabNavigationProp<ContatoStackParamList, "ContatoFormulario">;

export {PrincipalStackParamList, ContatoStackParamList,
    ContatoNavigator, PrincipalNavigator,
    PrincipalStackNavigationProp, ContatoBottomTabNavigationProp
};