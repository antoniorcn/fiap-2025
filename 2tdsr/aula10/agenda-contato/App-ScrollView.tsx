import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';


const listaContatos = [ 
  {id: 1, nome: "Joao Silva", tel: "(11)111-111", email: "joao@teste.com"},
  {id: 2, nome: "Maria Silva", tel: "(11)222-222", email: "maria@teste.com"},
  {id: 3, nome: "Jose Santos", tel: "(11)333-333", email: "jose@teste.com"},
  {id: 4, nome: "Joao Silva", tel: "(11)111-111", email: "joao@teste.com"},
  {id: 5, nome: "Maria Silva", tel: "(11)222-222", email: "maria@teste.com"},
  {id: 6, nome: "Jose Santos", tel: "(11)333-333", email: "jose@teste.com"},
  {id: 7, nome: "Joao Silva", tel: "(11)111-111", email: "joao@teste.com"},
  {id: 8, nome: "Maria Silva", tel: "(11)222-222", email: "maria@teste.com"},
  {id: 9, nome: "Jose Santos", tel: "(11)333-333", email: "jose@teste.com"},
  {id: 10, nome: "Joao Silva", tel: "(11)111-111", email: "joao@teste.com"},
  {id: 11, nome: "Maria Silva", tel: "(11)222-222", email: "maria@teste.com"},
  {id: 12, nome: "Jose Santos", tel: "(11)333-333", email: "jose@teste.com"},
  {id: 13, nome: "Joao Silva", tel: "(11)111-111", email: "joao@teste.com"},
  {id: 14, nome: "Maria Silva", tel: "(11)222-222", email: "maria@teste.com"},
  {id: 15, nome: "Jose Santos", tel: "(11)333-333", email: "jose@teste.com"},
]

const ContatoItem = ( props : any ) => { 
  return (
    <View style={{marginVertical: 20, marginHorizontal: 10,
      padding: 10, backgroundColor: "lightyellow", borderWidth: 2,
      borderRadius: 16
    }}>
      <Text>Nome: {props.nome}</Text>
      <Text>Telefone: {props.telefone}</Text>
      <Text>Email: {props.email}</Text>
    </View>
  )
}

export default function App() {
  const viewContatos = listaContatos.map( (item : any, indice : number) => { 
    return (
     <ContatoItem nome={item.nome} telefone={item.telefone} email={item.email}/>
    )
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" hidden={false} animated={false}
            backgroundColor="#00FF0099"
            translucent={true}/>
      <ScrollView>
        {viewContatos}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
