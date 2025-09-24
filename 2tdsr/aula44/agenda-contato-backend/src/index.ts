interface Contato { 
    nome : string;
    telefone : string;
    email: string;
}

const chaveSecreta = "ABC123";

// import Express from 'express';
const Express = require("express");
const jwt = require("jsonwebtoken");
const api = Express();
api.use( Express.json() );

const lista : Array<Contato> = [];

const email : string = "admin@teste.com";
const senha : string = "123456";

const filtroAutenticado = (req : any, res : any, proximo : any) => {
    console.log(req.headers["authorization"]);
    if (req.headers["authorization"]) { 
        proximo();
    } else { 
        res.json( {status: "erro", 
            mensagem: "Auntenticação não localizada"} );
    }
}

api.post("/login", (request : any, response : any)=>{
    console.log("POST Request em /login  Data ==>", request.body);
    if (request.body.email === email && request.body.senha === senha) { 
    
        const claim = { usename: request.email };
        const token = jwt.sign(claim, chaveSecreta, { expiresIn: "5m"});

        response.json( {status: "sucesso", 
        mensagem: "Login efetuado com sucesso",
        token} );
    } else { 
        response.json( {status: "erro", 
        mensagem: "Usuario ou senha invalidos"} );
    }
    
});

api.post("/contato", filtroAutenticado, (request : any, response : any)=>{
    console.log("POST Request em /contato  Data ==>", request.body);
    lista.push( request.body );
    response.json( {status: "sucesso", 
        mensagem: "Contato cadastrado com sucesso"} );
});

api.get("/contato", filtroAutenticado, (request : any, response : any)=>{
    console.log("GET Request em /contato" );
    response.json({status: "sucesso", 
        mensagem: "Lista de contatos",
        data: lista
    });
});

api.get("/", (request : any, response : any)=>{
    console.log("Alguem tentou dar um GET no /");
    response.json( {status: "sucesso", 
        mensagem: "Servidor Backend acionado /"} );
});


api.listen(8080, ()=>{
    console.log("Servidor Backend NodeJS inciado .... ");
});