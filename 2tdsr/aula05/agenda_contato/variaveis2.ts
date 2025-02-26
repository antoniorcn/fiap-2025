type Pares = 0 | 2 | 4 | 6 | 8 | 10;
const a : Pares = 4;
type Cor = "amarelo" | "vermelho" | 
"verde" | "azul" | "branco" | "preto";
const cor : Cor = "amarelo";

type StringEspecial = string | undefined | null | number;

const b : StringEspecial = undefined;
const c : StringEspecial = undefined;
const d : StringEspecial = "Teste";

// type Pessoa = { nome : string, telefone : string };

// type Estudante = { nome : string, telefone : string, 
//                     nota : number, faculdade : string};

type Matricula = number | string | null;

interface Pessoa { 
    nome : string
    telefone : string
};

interface Estudante extends Pessoa { 
    nota? : number
    faculdade : string
    matricula : Matricula
};


let obj1 : Pessoa;
let obj2 : Pessoa;
let obj3 : Pessoa;
let est1 : Estudante = {
        nome : "Joao Silva", 
        telefone : "(11) 1111-1111", 
        faculdade : "FIAP" }

obj1 = { nome : "Maria Silva", telefone : "(11) 1111-1111" }


