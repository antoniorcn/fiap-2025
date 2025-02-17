var j;
j = null;
console.log("J: " + j);
;
var pessoa4;
function mostrarPessoa(p, cabecalho, aluno) {
    if (cabecalho === void 0) { cabecalho = "Cabecalho Padrao"; }
    console.log(cabecalho);
    console.log("Nome: " + p.nome);
    console.log("Telefone: " + p.telefone);
    console.log("Email: " + p.email);
    console.log("CPF: " + p.cpf);
    if (p.idade) {
        console.log("Idade: " + p.idade);
    }
}
var pessoa2 = { nome: "Maria Silva",
    cpf: "987654321",
    telefone: "(11) 2222-2222",
    email: "maria@teste.com"
};
var pessoa3;
mostrarPessoa(pessoa2, "Pessoa 2");
