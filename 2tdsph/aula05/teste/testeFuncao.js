"use strict";
function somCachorro() {
    console.log("Au au");
}
const terror = {
    nome: "Terror",
    raca: "Doberman",
    som: () => { console.log("Hooofff Hooooff hrrrrr"); },
    dentes: 42,
    morder: () => { console.log("Mordendo..."); }
};
const cachorro1 = {
    nome: "Rex",
    raca: "Vira-lata",
    som: "Hoof Hoof"
};
const cachorro2 = {
    nome: "Fifi",
    raca: "Vira-lata",
    som: somCachorro
};
const cachorro3 = {
    nome: "Suri",
    raca: "Lhasa Apso",
    som: null
};
const leao = {
    nome: "Simba",
    raca: "Leão da Savana",
    som: () => {
        console.log("hoarrrr...");
    }
};
function Zoologico(animais) {
    for (let animal of animais) {
        console.log("Animal: ", animal.nome);
        console.log("Raça: ", animal.raca);
        console.log("Som: ");
        if (typeof animal.som === "string") {
            console.log(animal.som);
        }
        if (typeof animal.som === "function") {
            animal.som();
        }
    }
}
Zoologico([cachorro1, cachorro2, cachorro3, terror, leao]);
