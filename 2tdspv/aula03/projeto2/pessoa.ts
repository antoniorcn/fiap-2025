interface Pessoa { 
   nome : string
   idade : number
   cpf : string
   empresaEmpregadora? : string, 
   autenticar? : (senha : string ) => boolean
}

let p1 : Pessoa = { nome : "Joao Silva", 
    idade : 25, 
    cpf : "11111111111",
    empresaEmpregadora : "Fiap"
}


function retornarCabecalho( nome : string ) : string { 
    return "*********  Nome: " + nome + " ********** ";
}

console.log("Teste");
let f1 : (n : string) => string = retornarCabecalho;

console.log( f1("Joao") );

// let x : number | boolean | null | undefined

type generico = number | boolean | null | undefined

let x : generico
let y : generico
let z : generico
