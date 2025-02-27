let somar : (n1 : number, n2  : number) => number

function calculo( numero1 : number, numero2 : number) : number { 
    return numero1 + numero2;
}


somar = (numero1 : number, numero2 : number) : number => {
    return numero1 + numero2
}

let s = somar( 45, 89)

console.log("Resultado: ", s)

