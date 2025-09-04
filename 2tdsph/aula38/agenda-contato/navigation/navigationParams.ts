import { NavigationProp } from "@react-navigation/native";

    type RootStackParamList = {
        Login: undefined;
        Contato: [screen : string];
    };

    type ContatoStackParamList = { 
        ContatoFormulario: undefined;
        ContatoLista: undefined;
    }

    type RootScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

    type ContatoScreenNavigationProp = NavigationProp<ContatoStackParamList, 'ContatoFormulario'>;


    export { RootStackParamList, RootScreenNavigationProp,
        ContatoStackParamList, ContatoScreenNavigationProp };