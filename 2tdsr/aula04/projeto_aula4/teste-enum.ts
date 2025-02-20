enum TamanhoCamiseta {Pequeno, Medio, Grande};

let tamanho : TamanhoCamiseta;

tamanho = TamanhoCamiseta.Grande;

if (tamanho > TamanhoCamiseta.Medio) { 
    console.log("Esta camiseta serve em adultos");
} else { 
    console.log("Esta roupa é para crianças");
}