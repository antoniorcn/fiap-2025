enum DiaSemana {Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado};

let dia1 : DiaSemana = DiaSemana.Sabado;

let dia2 = DiaSemana.Terca;

if (dia1 > dia2) { 
    console.log("Sabado é maior que terça feira");
} else { 
    console.log("Terça feira é maior que sabado");
}


type Cor = "yellow" | "blue" | "green" | "red"

let c1 : Cor = "yellow"
