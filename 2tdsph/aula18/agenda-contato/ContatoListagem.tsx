import React from 'react';
import { FlatList, View, Text} from 'react-native';

const ContatoItem = (props : any) : React.ReactElement => { 
  return (
    <View style={styles.contato_item}>
      <Text>{props.item.nome}</Text>
      <Text>{props.item.telefone}</Text>
      <Text>{props.item.email}</Text>
    </View>
  )
}

const ContatoListagem = (props : any) : React.ReactElement => { 
    return (
      <View>
        <Text>Contato Listagem</Text>
        <FlatList data={props.lista} renderItem={ContatoItem}/>
      </View>
    )
}

export default ContatoListagem;