var DiaSemana;
(function (DiaSemana) {
    DiaSemana[DiaSemana["Sabado"] = 0] = "Sabado";
    DiaSemana[DiaSemana["Domingo"] = 1] = "Domingo";
    DiaSemana[DiaSemana["Segunda"] = 2] = "Segunda";
    DiaSemana[DiaSemana["Terca"] = 3] = "Terca";
    DiaSemana[DiaSemana["Quarta"] = 4] = "Quarta";
    DiaSemana[DiaSemana["Quinta"] = 5] = "Quinta";
    DiaSemana[DiaSemana["Sexta"] = 6] = "Sexta";
})(DiaSemana || (DiaSemana = {}));
;
var dia1 = DiaSemana.Sabado;
var dia2 = DiaSemana.Terca;
if (dia1 > dia2) {
    console.log("Sabado é maior que terça feira");
}
else {
    console.log("Terça feira é maior que sabado");
}
