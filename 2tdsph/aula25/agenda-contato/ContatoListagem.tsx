import React, {useContext} from 'react';
import { FlatList, View, Text, Button} from 'react-native';
import {styles} from './estilos';
import MeuContexto from './contexto';

const ContatoItem = (props : any) : React.ReactElement => { 
  return (
    <View style={styles.contato_item}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
      <Button title="Apagar" onPress={()=>{props.onApagar(props.item)}} />
      <Button title="Atualizar" onPress={()=>{props.onAtualizar(props.item)}} />
    </View>
  )
}

const ContatoListagem = (props : any) : React.ReactElement => { 
    const valorContexto = useContext( MeuContexto );
    return (
      <View>
        <Text>Contato Listagem</Text>
        <Button title="Carregar Contatos" onPress={valorContexto.carregar}/>
        <FlatList data={valorContexto.lista} 
          renderItem={( flatProps )=>
            <ContatoItem {...flatProps} onAtualizar={props.onAtualizar} onApagar={props.onApagar}/>}/>
      </View>
    )
}

export default ContatoListagem;