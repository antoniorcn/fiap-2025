let nomes : string[];
nomes = ["João", "Maria", "José"];

let numeros : number[];
numeros = [2, 4, 6, 8, 10];

// let listaNumerosETextos : any[];
// listaNumerosETextos = [10, 20, "04", "ervilha", 45, false, null, undefined, {}];

let numerosETextos : (string | number)[];
numerosETextos = [10, 20, "ervilha", "abobrinha", 20]


let numerosETextos2 : string[] | number[];
numerosETextos2 = [10, 20, 20]
numerosETextos2 = ["ervilha", "abobrinha"];

type NumeroETexto = string | number;

let numerosETextos3 : NumeroETexto[];
let numerosETextos4 : Array<NumeroETexto>;

// indices   0  1  2  3  4   5   6   7
let pares = [0, 2, 4, 6, 8, 10, 12, 14]
pares[6]   // 12
// A lista é ordenada

// indices        0          1         2   3     4
// let aluno = ["1111", "João Silva", 8.5, 20, "2o"]
// aluno[2]


// console.log("Iterando a lista");
// for (let i = 0; i < pares.length; i++ ) { 
//     let numero = pares[i];
//     console.log("Numero: ", numero, "  Triplo: ", numero * 3);
// }


// for (let chave in pares) { 
//     let valor = pares[chave];
//     console.log("Chave: ", chave, "Valor: ", valor, "  Triplo: ", valor * 3);
// }

// console.log("Iterando no objeto");
// for (const chave in aluno) { 
//     console.log( chave );
//     let valor = aluno[chave];
//     console.log( "Valor: ", valor);
// }

let aluno = {
    matricula: "1111", 
    nome : "João Silva", 
    media : 8.5, 
    falta : 20, 
    anoCursando : "2o"
}

console.log("Iterando com for of")
// for (let valor of pares) { 
//     console.log(valor);
// }

let listaChaves = Object.keys( aluno );
console.log("Chaves: ", listaChaves);

let listaValores = Object.values( aluno );
console.log("Valores: ", listaValores);

let listaEntry = Object.entries( aluno );
console.log("Entries: ", listaEntry);
