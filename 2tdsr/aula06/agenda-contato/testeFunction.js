var operacao;
var numero1 = 20;
var numero2 = 30;
// operacao = function (n1 : number, n2 : number) : number { 
//     return n1 + n2;
// }
operacao = function (n1, n2) {
    return n1 * n2;
};
var resultado = operacao(numero1, numero2);
console.log("Resultado: ", resultado);
