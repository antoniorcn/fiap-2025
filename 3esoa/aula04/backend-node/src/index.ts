const versao : number = 1.0;
console.log("Servidor Backend em NodeJS com Express");
console.log("Versão: ", versao);

const express : any = require("express")
const app : any = express()
app.use(express.json())
const porta : number = 8080

interface Contato { 
    id? : number
    nome : string
    telefone : string
    email : string
}

const lista : Contato[] = []; 

app.get("/", (request : any, response : any)=>{
    console.log("Requisição feita ao recurso /");
    response.send("Bem vindo ao servidor Backend com NodeJS na versão: " + versao);
});

app.post("/contato", (request : any, response : any) => {
    const contato : Contato = request.body;
    lista.push(contato);
    console.log("Request recebido via POST /contato: ", contato);
    console.log(`A Lista tem ${lista.length} contatos`);
    response.send("Ok");
});

app.get("/contato", (request: any, response: any) => { 
    console.log("Request recebido via GET /contato");
    response.send(lista);
});

app.listen( porta, ()=> {
    console.log("Servidor ativo ouvindo na porta: ", porta);
});


