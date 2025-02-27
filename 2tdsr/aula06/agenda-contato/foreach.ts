//           0  1  2   3   4   5   6
let lista = [3, 6, 9, 12, 15, 18, 21];

// for (let k = 0; k < 7; k = k + 1) { 
//     let valor = lista[k];
//     console.log("Valor: ", valor);
// }

// for (let valor of lista) { 
//     console.log("Valor: ", valor);
// }

for (let indice in lista) { 
    let valor = lista[indice];
    console.log("Indice: ", indice, "  Valor: ", valor);
}