import { Text, ToastAndroid, View } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import React, { useState } from 'react';
import ContatoFormulario from './ContatoFormulario';
import ContatoListagem from "./ContatoListagem";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const ContatoModulo = (props : any) : React.ReactElement => {
    const [lista, setLista] = useState<Contato[]>([]);

    const carregar = () => { 
      AsyncStorage.getItem("CONTATO-LISTA")
      .then(( strLista : string | null)=>{
        if (strLista != null) { 
          const listaAtual = JSON.parse( strLista );
          setLista( listaAtual );
          ToastAndroid.show(`Foram carrregados ${listaAtual.length} contatos`, ToastAndroid.LONG);
        }
      })
      .catch(( erro )=>{
        ToastAndroid.show("Erro ao carregar a lista", ToastAndroid.LONG);
      })
    }

    const gravar = (nome :string, telefone : string, email : string) => { 
      // setLista( [ ...lista, {id: 0, nome, telefone, email} ] )
      setLista(( listaAntiga : Contato[]) => {
        const contato = {id: 0, nome, telefone, email};
        const listaNova = [ ...listaAntiga, contato ];
        const strLista = JSON.stringify(listaNova);
        AsyncStorage.setItem("CONTATO-LISTA", strLista)
        .then(()=>{ToastAndroid.show("Contato gravado com sucesso", 
          ToastAndroid.LONG); })
        .catch(()=>{ToastAndroid.show("Erro ao gravar o contato", 
          ToastAndroid.LONG); })
        return listaNova;
      })

      

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
              {( navProps : any )=>
                <ContatoListagem  {...navProps} lista={lista} onCarregar={carregar}/>}
            </Tab.Screen>
  
        </Tab.Navigator>
      </View>
    )
  }

export default ContatoModulo;