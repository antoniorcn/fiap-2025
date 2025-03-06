import { StyleSheet, Text, View } from 'react-native';


let listaPersonagens: Personagem[];

let sage: Personagem = { nome: "Sage", vida: 100 };
let arana: Personagem = { nome: "Arana", vida: 100, arma: "Ak47" };
listaPersonagens = [sage, arana, { nome: "pimenta", vida: 85 }];
listaPersonagens.push({ nome: "Alberto", vida: 78 });



export default function App() {
  // const listaElementos = []
  // for (let i = 0; i < listaPersonagens.length; i++) {
  //   const personagem = listaPersonagens[i];
  //   listaElementos.push(<Text>Nome: {personagem.nome}</Text>)
  // }

  // for (let i in listaPersonagens) {
  //   const personagem = listaPersonagens[i];
  //   listaElementos.push(<Text>{personagem.nome}</Text>)
  // }

  // for (let personagem of listaPersonagens) {
  //   listaElementos.push(<Text>Nome: {personagem.nome}</Text>)
  // }

  const listaElementos = listaPersonagens.map(
    (personagem: Personagem) => {
      return (<Text>
        Programação funcional: {personagem.nome}
      </Text>)
    }
  )


  return (
    <View style={styles.container}>
      {listaElementos}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
