function calcular( numero1 : number, numero2: number, 
    operacao : string) : number { 
    if (operacao === '+') {
        return numero1 + numero2;
    } else if (operacao === '-') {
        return numero1 - numero2;
    } else if (operacao === '*') {
        return numero1 * numero2;
    } else if (operacao === '/') {
        return numero1 / numero2;
    } else if (operacao === 'R') {
        return numero1 ** (1 / numero2);
    } else {
        return 0;
    }
}

console.log("Multiplicação: ", calcular(2, 3, 'R')); // 5
