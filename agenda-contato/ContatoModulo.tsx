import { Text, ToastAndroid, View } from 'react-native';
import { FontAwesome5, Feather} from '@expo/vector-icons';
import React, { useState } from 'react';
import ContatoFormulario from './ContatoFormulario';
import ContatoListagem from "./ContatoListagem";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contato from './Contato';
import MeuContexto from './contexto';
import axios, { AxiosResponse } from 'axios';

const Tab = createBottomTabNavigator();

const ContatoModulo = (props : any) : React.ReactElement => {
    const [lista, setLista] = useState<Contato[]>([]);

    const [contato, setContato] = useState<Contato>({
      id: "",
      nome: "",
      telefone: "",
      email: ""
    });

    const handleContato = (campo : string, valor : string) => { 
      const obj : Contato = { ... contato };
      obj[campo] = valor;
      setContato( obj );
    }

    const carregar = () => { 
      axios.get("https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json")
      .then(( info : AxiosResponse<any, any> )=>{
        if (info.data) {
          const listaTemp : Contato[] = [];
          for (const chave in info.data) { 
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

    const gravar = () => { 
      // setLista( [ ...lista, {id: 0, nome, telefone, email} ] )
      if (contato.id) {
        axios.put(`https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos/${contato.id}.json`, contato)
        .then(( info : AxiosResponse<any, any> )=>{
            ToastAndroid.show(`Contato atualizado com sucesso`, ToastAndroid.LONG);
            novo();
            carregar();
          })
        .catch(( erro )=>{
          ToastAndroid.show("Erro ao atualiza o contato", ToastAndroid.LONG);
        });
      } else { 
        axios.post("https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos.json", contato)
        .then(( info : AxiosResponse<any, any> )=>{
            ToastAndroid.show(`Contato gravado com sucesso`, ToastAndroid.LONG);
            novo();
            carregar();
          })
        .catch(( erro )=>{
          ToastAndroid.show("Erro ao gravar o contato", ToastAndroid.LONG);
        });
      }
    }

    const apagar = ( obj : Contato ) => { 
      const caminho = `https://tdsph-ad96c-default-rtdb.firebaseio.com/contatos/${obj.id}.json`;
      alert("Apagando: " + caminho);
      axios.delete(caminho)
      .then(( info : AxiosResponse<any, any> )=>{
          ToastAndroid.show(`Contato apagado com sucesso`, ToastAndroid.LONG);
          novo();
          carregar();
        })
      .catch(( erro )=>{
        ToastAndroid.show("Erro ao apagar o contato", ToastAndroid.LONG);
      });
    }   

    const atualizar = ( obj : Contato ) => { 
      console.log("Atualizando Contato: ", contato);
      setContato( obj );
    }

    const novo = () => { 
      setContato( {nome : "", telefone : "", email : ""} )
    }

    return (
      <MeuContexto.Provider value={{
            lista,
            setLista,
            carregar,
            gravar,
            apagar,
            atualizar,
            contato,
            handleContato
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
                {(navProps : any)=>
                  <ContatoFormulario {...navProps} />}
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