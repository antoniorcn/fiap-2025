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
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const valorContexto = useContext( MeuContexto );

    return (
      <View>
        <Text>Contato Formulario</Text>
        <TextInput style={styles.input} placeholder="Nome Completo:"
          value={nome} onChangeText={setNome}/>
        <TextInput style={styles.input} placeholder="Telefone:"
          value={telefone} onChangeText={setTelefone}/>
        <TextInput style={styles.input} placeholder="Email:"
          value={email} onChangeText={setEmail}/>
        <MeuButton title="Gravar" onPress={()=>{
          valorContexto.gravar(nome, telefone, email);
        }} color="blue"/>
      </View>
    )
}

export default ContatoFormulario;