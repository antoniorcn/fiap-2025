import React, { useContext, useState } from 'react';
import { Button, View, Text, TextInput, TouchableHighlight} from 'react-native';
import {styles} from './estilos';
import MeuContexto from './contexto';

interface MeuButtonProps { 
  title : string
  color : string
  onPress : () => void
}

const MeuButton = ( props : MeuButtonProps) => { 
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={{
        backgroundColor: props.color,
        borderRadius: 16,
        borderColor: "white",
        borderWidth: 1,
        margin: 5,
        padding: 5
      }}>
        <Text style={{fontSize: 16, 
          color: "white",
          textAlign: "center"}}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

const ContatoFormulario = (props : any) : React.ReactElement => {
    const valorContexto = useContext( MeuContexto );
    const {contato, handleContato} = valorContexto;
    return (
      <View>
        <Text>Contato Formulario</Text>
        <TextInput style={styles.input} placeholder="Nome Completo:"
          value={contato.nome} onChangeText={(txt : string)=>{handleContato("nome", txt)}}/>
        <TextInput style={styles.input} placeholder="Telefone:"
          value={contato.telefone} onChangeText={(txt : string)=>{handleContato("telefone", txt)}}/>
        <TextInput style={styles.input} placeholder="Email:"
          value={contato.email} onChangeText={(txt : string)=>{handleContato("email", txt)}}/>
        <MeuButton title="Gravar" onPress={()=>{
          valorContexto.gravar();
        }} color="blue"/>
      </View>
    )
}

export default ContatoFormulario;