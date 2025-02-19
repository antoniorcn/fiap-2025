let a : string | undefined | null;

let b : string | null = null;

a = null

b = "B"

if (a === undefined) { 
    console.log("Nao definida");
} else { 
    console.log("Definida");
}