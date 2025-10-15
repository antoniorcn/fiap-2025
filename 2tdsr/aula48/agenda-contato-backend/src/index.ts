import { randomUUID } from "crypto";

interface Contato {
    id? : number;
    nome : string;
    telefone : string;
    email: string;
    imagem? : string;
}

const chaveSecreta = "ABC123";
const IMAGE_PATH = "D:/AntonioMad/fiap-2025/2tdsr/aula48/agenda-contato-backend/imagens";

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
let indiceId = 1;

const email : string = "admin@teste.com";
const senha : string = "123456";

// const upload = multer({
//   dest: "./imagens",
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });

const filtroAutenticadoJwt = (req : any, res : any, proximo : any) => {
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

const filtroAutenticado = (req : any, res : any, proximo : any) => {
    proximo();
    return;
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
    const contato = { ...request.body, id: indiceId++ };
    lista.push( contato );
    // indiceId++;
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

api.post("/imagem", filtroAutenticado, upload.single("imagem"), 
    async (request : any, response : any) => { 
    try { 
        // const contatoId = request.params.contatoId;
        console.log("Query ==> ", request.query);
        const contatoId = parseInt(request.query.contato_id);
        const tipo = request.query.tipo;
        console.log("Contato Id ==> ", contatoId);
        console.log("Tipo ==> ", tipo);
        const nomeImagem = randomUUID() + "." + tipo;
        console.log("Nome da imagem=>", nomeImagem);
        const destino = path.join(IMAGE_PATH, nomeImagem);
        console.log("Destino imagem=>", destino);
        await fs.writeFile(destino, request.file.buffer);

        const contatos = lista.filter( 
            ( contato : Contato ) => contato.id == contatoId );
        contatos.forEach( (contato : Contato) => {
            contato.imagem = nomeImagem;
        })
        response.json({status: "sucesso", 
            mensagem: "Imagem carregada",
            data: nomeImagem
        });
    } catch ( e : any ) { 
        console.error(e.stack);
        response.json({status: "error", 
            mensagem: "Erro ao carregar a imagem",
            data: e
        });
    }
})


api.get("/imagem/:contatoId", filtroAutenticado, 
    async (request : any, response : any) => { 
    const contatoId = parseInt(request.params.contatoId);
    console.log("Caregando imagem do contato ==> ", contatoId);
    let imagePath : string | null = null;
    for(let i = 0; i < lista.length; i++) { 
        const contato = lista[i];
        console.log("Analisando contato ==> ", contato);
        if (contato.id == contatoId && !!contato.imagem) { 
            console.log("Contato localizado ==> ", contato.imagem);
            imagePath = path.join(IMAGE_PATH, contato.imagem); // Assuming images are in a 'images' folder
            console.log("Carregando a imagem ==> ", imagePath);
            const ext = path.extname(contato.imagem).toLowerCase();
            let contentType = 'application/octet-stream'; // Default
            if (ext === '.jpg' || ext === '.jpeg') {
                contentType = 'image/jpeg';
            } else if (ext === '.png') {
                contentType = 'image/png';
            } else if (ext === '.gif') {
                contentType = 'image/gif';
            }
            response.set('Content-Type', contentType);
            response.sendFile(imagePath, {}, function (err : any) {
                if (err) {
                    console.log("Erro ao enviar a imagem => ", err);
                    response.status(err.status).end();
                }
                else {
                    console.log('Imagem enviada Sent:', imagePath);
                }
            });            
            // fs.readFile(imagePath, (err : any, data : any) => {
            //     console.log("Readfile executado");
            //     if (err) {
            //         console.error('Error reading image:', err);
            //         return response.status(404).send('Imagem não encontrada');
            //     }

            //     // Determine content type based on file extension (e.g., 'image/jpeg', 'image/png')
            //     const ext = path.extname(contato.imagem).toLowerCase();
            //     let contentType = 'application/octet-stream'; // Default
            //     if (ext === '.jpg' || ext === '.jpeg') {
            //         contentType = 'image/jpeg';
            //     } else if (ext === '.png') {
            //         contentType = 'image/png';
            //     } else if (ext === '.gif') {
            //         contentType = 'image/gif';
            //     }
            //     console.log("Imagem carregada retornando ContentType ==> ", contentType);
            //     response.writeHead(200, {
            //         'Content-Type': contentType,
            //         'Content-Length': data.length
            //     });
            //     response.end(data);
            //     return;
            // });
        }
    }
    if (imagePath == null) { 
        response.json({status: "error", 
            mensagem: "Erro ao carregar a imagem"
        });
    }
});


api.get("/", (request : any, response : any)=>{
    console.log("Alguem tentou dar um GET no /");
    response.json( {status: "sucesso", 
        mensagem: "Servidor Backend acionado /"} );
});


api.listen(8080, ()=>{
    console.log("Servidor Backend NodeJS inciado .... ");
});