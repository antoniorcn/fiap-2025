import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = { 
    Login: undefined;
    Contato : NavigatorScreenParams<ContatoStackParamList>;
}

type ContatoStackParamList = { 
    ContatoFormulario : undefined;
    ContatoListagem : undefined;
}

const RootStack = createStackNavigator<RootStackParamList>();
const ContatoStack = createBottomTabNavigator<ContatoStackParamList>();

type RootScreenNavigationProps = StackNavigationProp<RootStackParamList, "Login">;
type ContatoScreenNavigationProps = BottomTabNavigationProp<ContatoStackParamList, "ContatoListagem">;

export { 
    RootStackParamList, ContatoStackParamList, 
    RootStack, ContatoStack, 
    RootScreenNavigationProps, ContatoScreenNavigationProps
}