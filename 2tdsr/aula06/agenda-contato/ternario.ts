
interface Televisao { 
    marca : string
    polegadas : number
    estado : boolean
}

let tv1 = { 
    marca : "Samsung", 
    polegadas : 42, 
    estado : true
}

// let situacao = "LIGADA";
// if (tv1.estado == false) { 
//     situacao = "DESLIGADO";
// }

let situacao = 
    tv1.estado == true ? "LIGADO" : "DESLIGADO";

console.log( "Marca: ", tv1.marca);
console.log( "Polegadas: ", tv1.polegadas);
console.log( "Estado: ", situacao);