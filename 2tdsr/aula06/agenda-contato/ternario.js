var tv1 = {
    marca: "Samsung",
    polegadas: 42,
    estado: true
};
// let situacao = "LIGADA";
// if (tv1.estado == false) { 
//     situacao = "DESLIGADO";
// }
var situacao = tv1.estado == true ? "LIGADO" : "DESLIGADO";
console.log("Marca: ", tv1.marca);
console.log("Polegadas: ", tv1.polegadas);
console.log("Estado: ", situacao);
