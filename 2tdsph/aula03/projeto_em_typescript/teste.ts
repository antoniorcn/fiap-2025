let j : string | null;
j = null;
console.log("J: " + j);


interface Pessoa { 
    nome : string, 
    telefone: string, 
    email: string, 
    cpf: string, 
    idade?: number
};

interface Aluno extends Pessoa { 
    ra : string,
    curso : string,
    mostrar? : ( cabecalho : string ) => void
}

type PessoaType = { 
    nome : string, 
    telefone: string, 
    email: string, 
    cpf: string, 
    idade?: number
};

type AlunoType = { 
    nome : string, 
    telefone: string, 
    email: string, 
    cpf: string, 
    idade?: number,
    ra : string,
    curso : string,
};



let pessoa4 : PessoaType;


function mostrarPessoa ( p : Pessoa,  
                cabecalho : string = "Cabecalho Padrao", aluno?: Aluno ) : void { 
    console.log(cabecalho);
    console.log("Nome: " + p.nome);
    console.log("Telefone: " + p.telefone);
    console.log("Email: " + p.email);
    console.log("CPF: " + p.cpf);
    if (p.idade) { 
        console.log("Idade: " + p.idade);
    }
}

let pessoa2 : Pessoa = { nome : "Maria Silva", 
    cpf: "987654321", 
    telefone: "(11) 2222-2222", 
    email: "maria@teste.com"
};
let pessoa3 : Pessoa;

mostrarPessoa( pessoa2, "Pessoa 2" );