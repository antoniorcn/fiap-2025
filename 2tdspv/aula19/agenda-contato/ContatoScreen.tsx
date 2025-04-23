import { ParamListBase } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, ToastAndroid, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Contato } from './Contato';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

interface ContatoFormularioProps extends ParamListBase { 
    onGravar : ( nome : string, telefone: string, email : string ) => void   
  }
  
  const ContatoFormulario = (props : ContatoFormularioProps) :
         React.ReactElement => { 
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
  
    return (
      <View style={{flex: 1}}>
        <Text> Formulario de Contato </Text>
        <TextInput placeholder = "Nome Completo: "
          value={nome} onChangeText={setNome} />
        <TextInput placeholder = "Telefone: "
          value={telefone} onChangeText={setTelefone} />
        <TextInput placeholder = "Email: "
          value={email} onChangeText={setEmail} />
        <Button title="Gravar" onPress={()=>{
          props.onGravar( nome, telefone, email );
        }}/>
      </View>
    )
  }
  
  interface ContatoListagemProps extends ParamListBase { 
    lista : Contato[]
  }
  
  const ContatoListagem = (props : ContatoListagemProps) : React.ReactElement => { 
    return (
      <View style={{flex: 1}}>
        <Text> Listagem de Contato </Text>
        <FlatList data={props.lista} renderItem={( itemProps : any)=>{
          return ( 
            <View>
              <Text>Nome: {itemProps.item.nome}</Text>
              <Text>Telefone: {itemProps.item.telefone}</Text>
              <Text>Email: {itemProps.item.email}</Text>
            </View>
          )
        }}/>
      </View>
    )
  }
  
  interface ContatoModuloProps extends ParamListBase { 

  }

  const ContatoModulo = (props : ContatoModuloProps) : React.ReactElement => {
    const [lista, setLista] = useState<Contato[]>([]);

    const gravar = ( nome : string, telefone : string, email : string) => { 
      const obj : Contato = {nome, telefone, email};
      setLista( ( listaAntiga : Contato[] ) => {
        const novaLista = [ ...listaAntiga, obj ];
        const strLista = JSON.stringify( novaLista );
        AsyncStorage.setItem("CONTATO_LISTA", strLista)
        .then(()=>{
          ToastAndroid.show("Contato salvo com sucesso", ToastAndroid.LONG);
        })
        .catch(()=>{
          ToastAndroid.show("Erro ao salvar o contato", ToastAndroid.LONG);
        })
        return novaLista;
      });
    }

    useEffect(()=>{
      AsyncStorage.getItem("CONTATO_LISTA")
      .then(( strLista : string | null)=> {
        if (strLista != null) { 
          const listaNova = JSON.parse(strLista);
          setLista( listaNova );
          ToastAndroid.show(`Foram lidos ${listaNova.length} contatos do Banco de dados`, ToastAndroid.LONG);
        }
      })
      .catch(()=>{
        ToastAndroid.show("Erro ao carregar a lista de contatos", ToastAndroid.LONG);
      });
    }, [])
    
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="ContatoFormulario">
            {(navProps : ParamListBase)=>
              <ContatoFormulario {...navProps} onGravar={gravar}/>}
          </Tab.Screen>
          <Tab.Screen name="ContatoListagem">
            {(navProps : ParamListBase)=>
              <ContatoListagem {...navProps} lista={lista}/>}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    )
  }
  
export { ContatoModulo }