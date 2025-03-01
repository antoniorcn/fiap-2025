var somar = function (numero1, numero2) {
    return numero1 + numero2;
};
var subtrair = function (numero1, numero2) {
    return numero1 - numero2;
};
var multiplicar = function (numero1, numero2) {
    return numero1 * numero2;
};
function calculadoraNova(n1, n2, operacao) {
    return operacao(n1, n2);
}
var res = calculadoraNova(10, 20, somar);
console.log("Somar: ", res);
res = calculadoraNova(10, 20, subtrair);
console.log("Subtracao: ", res);
res = calculadoraNova(80, 60, subtrair);
console.log("Subtracao: ", res);
res = calculadoraNova(80, 60, multiplicar);
console.log("Multiplicacao: ", res);
