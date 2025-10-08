import { randomUUID } from "crypto";

interface Contato { 
    nome : string;
    telefone : string;
    email: string;
}

const chaveSecreta = "ABC123";

// import Express from 'express';
const Express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const api = Express();
api.use( Express.json() );
api.use( cors() );

const lista : Array<Contato> = [];

const email : string = "admin@teste.com";
const senha : string = "123456";

const upload = multer({
  dest: "./imagens",
});

const filtroAutenticado = (req : any, res : any, proximo : any) => {
    const auth = req.headers["authorization"];
    console.log(auth);
    if (auth) {
        const token = auth.substring(7, auth.length).trim()
        if (token) { 
            jwt.verify(token, chaveSecreta, (erro : any, encoded : any) => {
                if (!erro) { 
                    proximo();
                    return;
                }
            });
        }
    }
    res.status(401).json( {status: "erro", mensagem: "Autenticação não localizada ou inválida"} );
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

api.post("/imagem", upload.single("imagem"), 
    async (request : any, response : any) => { 
        try { 
            console.log("Body: ", request.body);
            const body = JSON.parse(request.body["imagemInfo"]);
            console.log("File: ", request.file);
            const nomeImagem = randomUUID() + "." + body.tipo;
            console.log("Nome da imagem=>", nomeImagem);
            const destino = path.join( "./imagens", nomeImagem );
            console.log("Destino imagem=>", destino);
            await fs.writeFile( destino, request.file.buffer );
            response.json({status: "sucesso", 
                mensagem: "Imagem carregada",
                data: body
            });
        } catch ( e ) { 
            response.json({status: "error", 
                mensagem: "Erro ao carregar a imagem",
                data: e
            });
        }
})

api.get("/", (request : any, response : any)=>{
    console.log("Alguem tentou dar um GET no /");
    response.json( {status: "sucesso", 
        mensagem: "Servidor Backend acionado /"} );
});


api.listen(8080, ()=>{
    console.log("Servidor Backend NodeJS inciado .... ");
});