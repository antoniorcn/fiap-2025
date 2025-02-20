var p1 = { nome: "Joao Silva",
    idade: 25,
    cpf: "11111111111",
    empresaEmpregadora: "Fiap"
};
function retornarCabecalho(nome) {
    return "*********  Nome: " + nome + " ********** ";
}
console.log("Teste");
var f1 = retornarCabecalho;
console.log(f1("Joao"));
