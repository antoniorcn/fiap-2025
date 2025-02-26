const a : number = 10;

const lista : number[] = [1, 2, 3, 4, 5];

interface Pessoa { 
    nome : string;
    idade : number;
    documento? : string;
}

const p1 : Pessoa = 
{
    nome : "Joao",
    idade : 25,
}

const p2 : Pessoa = 
{
    nome : "Maria",
    idade : 34,
    documento : "123.456.789-00"
}

function rh( p: Pessoa, funcaoFazAlgumaCoisa : (p: Pessoa) => void) : void { 
    console.log("Sistema de RH Gestão de Pessoas");
    funcaoFazAlgumaCoisa( p );
}


let fazAlgo : (p : Pessoa) => void = function (p: Pessoa) { 
    console.log("Nome: ", p.nome);
    console.log("Idade: ", p.idade);
    console.log("Documento: ", p.documento);
}


rh( p1, fazAlgo)