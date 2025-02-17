import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  // indices    0  1  2  3  4     5      6       7     8
  let lista = [ 1, 3, 5, 7, 9, "Joao", "Maria", true, null ];
  console.log( lista );
  // indices         0              1          2                   3
  // let pessoa1 = ["Joao Silva", "12345678", "joao@teste.com", "(11) 1111-1111"]
  // console.log("Telefone: " + pessoa1[3]);

  let pessoa2 : { nome : string, 
                  telefone: string, 
                  email: string, 
                  cpf: string, 
                  idade?: number
                };
  pessoa2 = { nome: "Maria Silva", telefone: "(11) 2222-2222", 
    email: "maria@teste.com", 
    cpf: "987654321", idade: 25 };

  console.log(pessoa2["idade"]);

  // enum UF {SP, RJ, MG, ES, PR, SC, RS, MS, MT, GO, 
  //   DF, BA, SE, AL, PE, PB, RN, CE, PI, MA, TO, PA, AP, RR, AM, AC, RO};
  // let estado : UF;
  // estado = UF.MG;

  enum Severidade { BAIXA, MEDIA, ALTA, CRITICA };
  let severidadeProblema : Severidade;


  severidadeProblema = Severidade.BAIXA;

  if (severidadeProblema > Severidade.ALTA) { 
    console.log("Precisa ser resolvido em menos de 2 horas");
  } else { 
    console.log("Você tem 24 horas para resolvee");
  }


  type DiaSemana = "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB"| "DOM";

  type tamanhos = 10 | 12 | 14 | 16 | 18 | 20| 42 | 44 | 46 | 48 | 50;

  type Boleano = true | false | null;


  let diaTrabalho : DiaSemana = "SEG";
  

  let j : string;

  console.log("J" + j);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
