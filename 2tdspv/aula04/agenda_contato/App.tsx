import React from 'react';
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';

function Principal () {
  return ( 
    <View style={{flex: 1, alignItems: "stretch", paddingVertical: 25,
      paddingHorizontal: 15
    }}>
      <Text style={{fontSize: 28, textAlign: "center", marginBottom: 15}}>Agenda de Contato</Text>
      <Text style={estilos.textCampo}>Nome:</Text>
      <TextInput style={estilos.textInput}/>
      <Text style={estilos.textCampo}>Email:</Text>
      <TextInput keyboardType="email-address" style={estilos.textInput}/>
      <Text style={estilos.textCampo}>Telefone:</Text>
      <TextInput keyboardType="phone-pad" style={estilos.textInput}/>
      <Button title="Salvar" />
      <Button title="Pesquisar" />
    </View>
  )
}


const estilos = StyleSheet.create({
  textInput : {backgroundColor: "lightyellow", 
    borderWidth: 1, borderColor: "red",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 10,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    elevation: 5,
    marginVertical: 10
  },
  textCampo : {marginTop: 5, fontSize: 18}
});

// const estiloTextInput = {backgroundColor: "lightyellow", 
//   borderWidth: 1, borderColor: "red",
//   borderRadius: 15,
//   shadowColor: "black",
//   shadowRadius: 10,
//   shadowOffset: {width: 5, height: 5},
//   shadowOpacity: 0.5,
//   elevation: 5,
// }

export default Principal