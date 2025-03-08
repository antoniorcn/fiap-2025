import React from 'react';
import {View, Text} from 'react-native';

interface Aluno { 
  ra : string
  nome : string
  media : number
}

const alunos : Aluno[] = [
  {ra: "111", nome: "João Silva", media: 7.8},
  {ra: "222", nome: "Maria Silva", media: 8.5},
  {ra: "333", nome: "Jose Santos", media: 8.3}
]

const listaVisuais : React.ReactElement[] = []

const Principal = () => {

  for (const aluno of alunos) { 
    listaVisuais.push(
      <View style={{backgroundColor: "lightyellow",
        margin: 5, borderWidth: 1, padding: 5, 
      }}>
        <Text>RA: {aluno.ra}</Text>
        <Text>Nome: {aluno.nome}</Text>
        <Text>Media: {aluno.media}</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Lista de Alunos</Text>
      {listaVisuais}
    </View>
  )
}

export default Principal;