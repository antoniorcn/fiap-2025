import { Text, ToastAndroid, View } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import React, { useState } from 'react';
import ContatoFormulario from './ContatoFormulario';
import ContatoListagem from "./ContatoListagem";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contato from './Contato';
import MeuContexto from './contexto';
import axios from 'axios';

const Tab = createBottomTabNavigator();

const ContatoModulo = (props : any) : React.ReactElement => {
    const [lista, setLista] = useState<Contato[]>([]);

    const carregar = () => { 
      axios.get("https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json")
      .then(( info : AxiosResponse<any, any> )=>{
        if (info.data) {
          const listaTemp : Contato[] = [];
          for (chave in info.data) { 
            const obj = info.data[chave];
            obj.id = chave;
            listaTemp.push( obj );
          }
          setLista( listaTemp );
          ToastAndroid.show(`Foram carrregados ${listaTemp.length} contatos`, ToastAndroid.LONG);
        }
      })
      .catch(( erro )=>{
        ToastAndroid.show("Erro ao carregar a lista", ToastAndroid.LONG);
      })
    }

    const gravar = (nome :string, telefone : string, email : string) => { 
      // setLista( [ ...lista, {id: 0, nome, telefone, email} ] )
      const obj = {nome, telefone, email};
      axios.post("https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json", obj);
      .then(( info : AxiosResponse<any, any> )=>{
          ToastAndroid.show(`Contato gravado com sucesso`, ToastAndroid.LONG);
        }
      })
      .catch(( erro )=>{
        ToastAndroid.show("Erro ao carregar a lista", ToastAndroid.LONG);
      })

      

    }
    return (
      <MeuContexto.Provider value={{
            lista,
            setLista,
            carregar,
            gravar
      }}>
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
                {(navProps : any)=><ContatoFormulario {...navProps}/>}
            </Tab.Screen>
            <Tab.Screen name="contato-listagem" 
              options = {{
                title: "Listagem",
                tabBarIcon: ({color, size})=> 
                  <Feather name="list" color={color} size={size}/>
              }}>
                {( navProps : any )=>
                  <ContatoListagem  {...navProps}/>}
              </Tab.Screen>
    
          </Tab.Navigator>
        </View>
      </MeuContexto.Provider>
    )
  }

export default ContatoModulo;