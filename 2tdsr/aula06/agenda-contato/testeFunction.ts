let operacao : (n1 : number, n2 : number) => number;


let numero1 = 20;
let numero2 = 30;

// operacao = function (n1 : number, n2 : number) : number { 
//     return n1 + n2;
// }

operacao = function (n1 : number, n2 : number) : number { 
    return n1 * n2;
}

const resultado = operacao( numero1, numero2 ) 
console.log("Resultado: ", resultado);
