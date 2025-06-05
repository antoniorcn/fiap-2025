import React, {useContext} from 'react';
import { FlatList, View, Text, Button} from 'react-native';
import {styles} from './estilos';
import MeuContexto from './contexto';
import Contato from './Contato';

const ContatoItem = (props : any) : React.ReactElement => { 
  return (
    <View style={styles.contato_item}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
      <Button title="Apagar" onPress={()=>{props.onApagar(props.item)}} />
      <Button title="Atualizar" onPress={()=>{
        props.onAtualizar(props.item);
      }}/>
    </View>
  )
}

const ContatoListagem = (props : any) : React.ReactElement => { 
    const valorContexto = useContext( MeuContexto );
    const {lista, carregar, apagar, atualizar} = valorContexto;
    return (
      <View>
        <Text>Contato Listagem</Text>
        <Button title="Carregar Contatos" onPress={carregar}/>
        <FlatList data={lista} 
          renderItem={( flatProps : any )=>
            <ContatoItem {...flatProps} onAtualizar={(contato : Contato)=>{
                atualizar(contato);
                console.log("Atualizando e navegando....");
                props.navigation.navigate("contato-formulario");
              }} 
                onApagar={apagar}/>}/>
      </View>
    )
}

export default ContatoListagem;