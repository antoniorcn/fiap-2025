;
var sage = { nome: "Sage", vida: 100 };
var arana = { nome: "Arana", vida: 100, arma: "Ak47" };
var listaPersonagens;
listaPersonagens = [sage, arana, { nome: "pimenta", vida: 85 }];
listaPersonagens.push({ nome: "Alberto", vida: 78 });
console.log(listaPersonagens);
// sage = { nome: "anonimo", vida: 35 };
sage.nome = "Anonimo";
console.log(listaPersonagens);
// Mostra as chaves do Objeto
console.log("Chaves: ");
console.log(Object.keys(sage)); //  [ nome, vida ] 
console.log(Object.keys(arana)); //  [ nome, vida, arma ] 
// Mostra os valores do Objeto
console.log("Valores: ");
console.log(Object.values(sage)); //  [ "Sage", 100 ] 
console.log(Object.values(arana)); //  [ "Arana", 100, "AK-47" ] 
// Mostra tuplas com o par chave e valor de cada propriedade do Objeto
console.log("Entries: ");
console.log(Object.entries(sage)); //  [ "Sage", 100 ] 
console.log(Object.entries(arana)); //  [ "Arana", 100, "AK-47" ] 
// Iterar nos objetos da lista
// [
//   { nome: 'Anonimo', vida: 100 },
//   { nome: 'Arana', vida: 100, arma: 'Ak47' },
//   { nome: 'pimenta', vida: 85 },
//   { nome: 'Alberto', vida: 78 }
// ]
// { nome: 'Anonimo', vida: 100 },
// 
console.log("Iterando no objeto Sage");
for (var chave in sage) {
    console.log("Chave: ", chave);
}
console.log("Iterando na lista de Personagens");
for (var chave in listaPersonagens) {
    console.log("Chave: ", chave);
}
console.log("Iterando na lista de Personagens");
for (var _i = 0, listaPersonagens_1 = listaPersonagens; _i < listaPersonagens_1.length; _i++) {
    var valor = listaPersonagens_1[_i];
    console.log("Valor: ", valor);
}
