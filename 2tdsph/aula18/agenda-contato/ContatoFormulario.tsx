import React, { useState } from 'react';
import { Button, View, Text, TextInput} from 'react-native';
import {styles} from './estilos';

const ContatoFormulario = (props : any) : React.ReactElement => {
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    return (
      <View>
        <Text>Contato Formulario</Text>
        <TextInput style={styles.input} placeholder="Nome Completo:"
          value={nome} onChangeText={setNome}/>
        <TextInput style={styles.input} placeholder="Telefone:"
          value={telefone} onChangeText={setTelefone}/>
        <TextInput style={styles.input} placeholder="Email:"
          value={email} onChangeText={setEmail}/>
        <Button title="Gravar" onPress={()=>{
          props.onGravar(nome, telefone, email);
        }}/>
      </View>
    )
}

export default ContatoFormulario;