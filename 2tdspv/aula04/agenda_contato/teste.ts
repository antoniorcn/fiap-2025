let x : number | string | boolean 

  x = 10;
  x = "teste";
  x = true;

  // let moeda : "US$" | "R$"| "€";
  type Moeda = "US$" | "R$"| "€";

  let pagamento : Moeda;

  pagamento = "US$"
  pagamento = "R$"
  pagamento = "€"
  // pagamento = "bananas"


  interface Pessoa {
    nome : string
    idade : number
    cpf : string
  }

  interface Estudante { 
    disciplina : string
    nota : number
  }

  let a1 : Pessoa & Estudante = { 
    nome : "Fulano",
    idade : 30,
    cpf : "123.456.789-00",
    disciplina : "MAD",
    nota : 8.8
  }

  // interface Estudante extends Pessoa{ 
  //   disciplina : string
  //   nota : number
  // }

  // let a1 : Estudante = { 
  //   nome : "Fulano",
  //   idade : 30,
  //   cpf : "123.456.789-00",
  //   disciplina : "MAD",
  //   nota : 8.8
  // }