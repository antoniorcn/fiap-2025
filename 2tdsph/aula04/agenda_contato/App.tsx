import React from "react";
import {
  Button,
  Pressable,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

const estilos = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "black",
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    backgroundColor: "lightcyan",
  },
  buttonText: { fontSize: 16, 
    fontWeight: "bold", 
    textAlign: "center",
    padding: 10,
    color: "white",
    textTransform: "uppercase"
   }
});

interface BotaoProps { 
  title : string
  color : string
}


function Botao( props : BotaoProps ) { 
  return (
    <Pressable>
    <View
      style={{
        backgroundColor: props.color,
      }}
    >
      <Text
        style={estilos.buttonText}
      >
        {props.title}
      </Text>
    </View>
  </Pressable>
  );
}

function AgendaForm() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderWidth: 2, padding: 15 }}>
        <Text style={{ fontSize: 38, textAlign: "center" }}>
          Agenda de Contato
        </Text>
        <Text>Nome</Text>
        <TextInput
          style={estilos.textInput}
          placeholderTextColor="lightgray"
          placeholder="Digite o nome completo"
        />
        <Text>Telefone:</Text>
        <TextInput placeholder="(DD) XXXXX-XXXX" style={estilos.textInput} />
        <Text>Email:</Text>
        <TextInput
          placeholder="Informe seu melhor email"
          style={estilos.textInput}
        />

        <Botao title="Gravar" color="green"/>       
        <Botao title="Pesquisar" color="blue"/>

      </View>
    </View>
  );
}

export default AgendaForm;
