function somCachorro() { 
    console.log("Au au");
}

interface Animal { 
    nome : string;
    raca : string;
    som : (() => void) | null | string;
}

interface Feroz { 
    dentes : number;
    morder : () => void;
}

const terror : Animal & Feroz = {
    nome : "Terror",
    raca : "Doberman",
    som : () => { console.log("Hooofff Hooooff hrrrrr"); },
    dentes : 42,
    morder : () => { console.log("Mordendo..."); }
} 

const cachorro1 : Animal = { 
    nome : "Rex",
    raca : "Vira-lata",
    som : "Hoof Hoof"
}

const cachorro2 : Animal = { 
    nome : "Fifi",
    raca : "Vira-lata",
    som : somCachorro
}

const cachorro3 : Animal = { 
    nome : "Suri",
    raca : "Lhasa Apso",
    som : null
}

const leao : Animal = { 
    nome : "Simba",
    raca : "Leão da Savana",
    som : () => { 
        console.log("hoarrrr...");
    }
}

function Zoologico( animais : Animal[] ) { 
    for (let animal of animais ) { 
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