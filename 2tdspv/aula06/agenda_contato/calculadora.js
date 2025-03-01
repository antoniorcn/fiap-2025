function calculadora(n1, n2, operacao) {
    if (operacao === "+") {
        return n1 + n2;
    }
    else if (operacao === "-") {
        return n1 - n2;
    }
    else if (operacao == "*") {
        return n1 * n2;
    }
    else if (operacao == "/") {
        return n1 / n2;
    }
}
var resultado = calculadora(23, 14, "+");
console.log("Soma: ", resultado);
resultado = calculadora(23, 14, "-");
console.log("Subtracao: ", resultado);
resultado = calculadora(23, 14, "*");
console.log("Multiplicacao: ", resultado);
resultado = calculadora(23, 14, "/");
console.log("Divisao: ", resultado);
