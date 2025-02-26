"use strict";
const a = 10;
const lista = [1, 2, 3, 4, 5];
const p1 = {
    nome: "Joao",
    idade: 25,
};
const p2 = {
    nome: "Maria",
    idade: 34,
    documento: "123.456.789-00"
};
function rh(p, funcaoFazAlgumaCoisa) {
    console.log("Sistema de RH Gestão de Pessoas");
    funcaoFazAlgumaCoisa(p);
}
let fazAlgo = function (p) {
    console.log("Nome: ", p.nome);
    console.log("Idade: ", p.idade);
    console.log("Documento: ", p.documento);
};
rh(p1, fazAlgo);
