import { Text, View } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import React, { useState } from 'react';
import ContatoFormulario from './ContatoScreen';
import ContatoListagem from "./ContatoListagem";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const ContatoModulo = (props : any) : React.ReactElement => {
    const [lista, setLista] = useState<Contato[]>([]);
    const gravar = (nome :string, telefone : string, email : string) => { 
      setLista( [ ...lista, {id: 0, nome, telefone, email} ] )
    }
    return ( 
      <View style={{flex: 1}}>
        <Text>Contatos</Text>
        <Tab.Navigator screenOptions={{
          headerShown: false
        }}>
          <Tab.Screen name="contato-formulario" 
            options = {{
              title: "Formulário",
              tabBarIcon : ({color, size, focused})=>
                <FontAwesome5 name="clipboard" color={color} size={size}/>,
            }}>
              {(navProps : any)=><ContatoFormulario {...navProps} onGravar={gravar}/>}
          </Tab.Screen>
          <Tab.Screen name="contato-listagem" 
            options = {{
              title: "Listagem",
              tabBarIcon: ({color, size})=> 
                <Feather name="list" color={color} size={size}/>
            }}>
              {( navProps : any )=><ContatoListagem  {...navProps} lista={lista}/>}
            </Tab.Screen>
  
        </Tab.Navigator>
      </View>
    )
  }

export default ContatoModulo;