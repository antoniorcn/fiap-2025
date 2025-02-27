function somar(x, y) {
    return x + y;
}
function raiz(x, y) {
    return Math.pow(x, (1 / y));
}
function calcular(n1, n2, operacao) {
    return operacao(n1, n2);
}
var resultCalculo = calcular(25, 2, raiz);
console.log("Resultado : ", resultCalculo); // 30
