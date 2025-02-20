var TamanhoCamiseta;
(function (TamanhoCamiseta) {
    TamanhoCamiseta[TamanhoCamiseta["Pequeno"] = 0] = "Pequeno";
    TamanhoCamiseta[TamanhoCamiseta["Medio"] = 1] = "Medio";
    TamanhoCamiseta[TamanhoCamiseta["Grande"] = 2] = "Grande";
})(TamanhoCamiseta || (TamanhoCamiseta = {}));
;
var tamanho;
tamanho = TamanhoCamiseta.Grande;
if (tamanho > TamanhoCamiseta.Medio) {
    console.log("Esta camiseta serve em adultos");
}
else {
    console.log("Esta roupa é para crianças");
}
