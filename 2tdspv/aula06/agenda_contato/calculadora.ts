function calculadora(n1: number, n2: number,
    operacao: string): number {
    if (operacao === "+") {
        return n1 + n2;
    } else if (operacao === "-") {
        return n1 - n2;
    } else if (operacao == "*") {
        return n1 * n2;
    } else if (operacao == "/") {
        return n1 / n2;
    } else if (operacao == "**") { 
        return n1 ** n2;
    }
}

const resultado = calculadora(23, 14, "+");
console.log("Soma: ", resultado);

resultado = calculadora(23, 14, "-");
console.log("Subtracao: ", resultado);

resultado = calculadora(23, 14, "*");
console.log("Multiplicacao: ", resultado);

resultado = calculadora(23, 14, "/");
console.log("Divisao: ", resultado);
