let numeroBool : number | boolean;
numeroBool = true;

interface Pessoa { 
    nome : string;
    telefone : string;
}

interface Estudante { 
    nota : number;
    rm : string;
}

type Aluno = Pessoa & Estudante;
let aluno : Aluno = { 
    nome : "João", telefone : "1234",
    nota : 9, rm : "1234" };