import { ParamListBase } from "@react-navigation/native";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CicloSocial from './CicloSocial';

const Tab = createBottomTabNavigator();

interface CicloSocialFormularioProps extends ParamListBase { 
    onGravar : ( nome : string, descricao: string ) => void   
}
  
const CicloSocialFormulario = (props : CicloSocialFormularioProps) :
         React.ReactElement => { 
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
  
    return (
      <View style={{flex: 1}}>
        <Text> Formulario do Ciclo Social </Text>
        <TextInput placeholder = "Nome: "
          value={nome} onChangeText={setNome} />
        <TextInput placeholder = "Descricao: "
          value={descricao} onChangeText={setDescricao} />
        <Button title="Gravar" onPress={()=>{
          props.onGravar( nome, descricao );
        }}/>
      </View>
    )
  }
  
  interface CicloSocialListagemProps extends ParamListBase { 
    lista : CicloSocial[]
  }
  
  const CicloSocialListagem = (props : CicloSocialListagemProps) : React.ReactElement => { 
    return (
      <View style={{flex: 1}}>
        <Text> Listagem de Ciclo Social </Text>
        <FlatList data={props.lista} renderItem={( itemProps : any)=>{
          return ( 
            <View>
              <Text>Nome: {itemProps.item.nome}</Text>
              <Text>Descricao: {itemProps.item.descricao}</Text>
            </View>
          )
        }}/>
      </View>
    )
  }
  
  interface CicloSocialModuloProps extends ParamListBase { 

  }
 
  const CicloSocialModulo = (props : CicloSocialModuloProps) : React.ReactElement => {
    const [lista, setLista] = useState<CicloSocial[]>([]);

    const gravar = ( nome : string, descricao : string) => { 
      const obj : CicloSocial = {nome, descricao};
      setLista( [ ...lista,  obj ] );
    }

    
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen name="CicloSocialFormulario">
            {(navProps : ParamListBase)=>
              <CicloSocialFormulario {...navProps} onGravar={gravar}/>
            }         
          </Tab.Screen>
          <Tab.Screen name="CicloSocialListagem">
            {(navProps : ParamListBase)=>
              <CicloSocialListagem {...navProps} lista={lista}/>
            }
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    )
  }
  
export { CicloSocialModulo }