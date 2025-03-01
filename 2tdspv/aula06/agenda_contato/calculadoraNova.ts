const somar = (numero1 : number, 
        numero2 : number) : number => {
    return numero1 + numero2;
};

const subtrair = (numero1 : number, 
        numero2 : number) : number => {
    return numero1 - numero2;
}

const multiplicar = (numero1 : number, 
    numero2 : number) : number => { 
        return numero1 * numero2;
};

function calculadoraNova( n1 : number, n2 : number, 
    operacao : any) : number { 
        return operacao( n1, n2 );
}

let res = calculadoraNova( 10, 20, somar );
console.log("Somar: ", res);
res = calculadoraNova( 10, 20, subtrair );
console.log("Subtracao: ", res);
res = calculadoraNova( 80, 60, subtrair );
console.log("Subtracao: ", res);
res = calculadoraNova( 80, 60, multiplicar );
console.log("Multiplicacao: ", res);