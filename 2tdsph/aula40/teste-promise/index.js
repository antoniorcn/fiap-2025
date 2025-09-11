"use strict";
const t = 2000;
const esperar = (tempo) => {
    return new Promise((resolve, reject) => {
        if (tempo < 0) {
            reject("Tempo inválido!");
            return;
        }
        setTimeout(() => {
            const sucesso = Math.random() > 0.5;
            if (sucesso) {
                resolve(`Deu certo! O numero foi gerado em ${tempo}ms`);
            }
            else {
                reject(new Error("Algo deu errado!"));
            }
        }, tempo);
    });
};
console.log("Iniciado ... ");
esperar(t)
    .then((dados) => {
    console.log("Sucesso");
    console.log(dados);
})
    .catch((erro) => {
    console.log("Falha");
    console.log(erro);
})
    .finally(() => {
    console.log("Finalizado...");
});
