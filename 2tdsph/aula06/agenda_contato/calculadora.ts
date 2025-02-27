function calculadora( numero1 : number, 
                      numero2 : number,
                      operacao : string ) : number { 
    if ( operacao === "+") { 
        return numero1 + numero2;
    } else if (operacao === "-") {
        return numero1 - numero2;
    } else if ( operacao === "*") { 
        return numero1 * numero2;
    } else if (operacao === "/") {
        return numero1 / numero2;
    } else if (operacao === "**") { 
        return numero1 ** numero2;
    }
    return NaN;
}

let r1 = calculadora( 10, 20, "+")  // 30
let r2 = calculadora( 60, 5, "-")   // 55
let r3 = calculadora( 3, 5, "*")    // 15
let r4 = calculadora( 72, 12, "/")  // 6


console.log( "Resultado 1: ", r1);
console.log( "Resultado 2: ", r2);
console.log( "Resultado 3: ", r3);
console.log( "Resultado 4: ", r4);