function calcular(numero1, numero2, operacao) {
    if (operacao === '+') {
        return numero1 + numero2;
    }
    else if (operacao === '-') {
        return numero1 - numero2;
    }
    else if (operacao === '*') {
        return numero1 * numero2;
    }
    else if (operacao === '/') {
        return numero1 / numero2;
    }
    else {
        return 0;
    }
}
console.log("Soma: ", calcular(2, 3, '*')); // 5
