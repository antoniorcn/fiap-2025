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
    </View>
  )
}

const ContatoListagem = (props : any) : React.ReactElement => { 
    const valorContexto = useContext( MeuContexto );
    return (
      <View>
        <Text>Contato Listagem</Text>
        <Button title="Carregar Contatos" onPress={valorContexto.carregar}/>
        <FlatList data={valorContexto.lista} renderItem={ContatoItem}/>
      </View>
    )
}

export default ContatoListagem;