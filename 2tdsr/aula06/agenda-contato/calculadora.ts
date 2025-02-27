function somar(x : number, y: number) : number { 
    return x + y;
}

function raiz(x : number, y: number) : number { 
    return x ** (1 / y);
}

function dividir(x : number, y: number) : number {
    return x / y;
}

function multiplicar(x : number, y: number) : number {
    return x * y;
}

let funcao = multiplicar;

function calcularNovo(n1 : number, n2: number, 
    operacao : (x : number, y : number) => number
) : number { 
    return operacao(n1, n2);
}

let resultCalculo = calcularNovo(25, 2, raiz)
console.log("Resultado : ", resultCalculo); // 30