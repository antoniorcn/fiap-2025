import axios, { AxiosResponse } from 'axios';
import { Contato, ContatoErro } from '../model/contato';

const apiBase = axios.create({
    baseURL: "http://localhost:8080"
});

interface SalvarCallback { 
    (sucesso : boolean, erro : string, 
        contatoCamposErro? : ContatoErro) : void
}

interface CarregarCallback { 
    (sucesso : boolean, erro : string, 
        listaContatos : Array<Contato>) : void
}

interface ApagarCallback { 
    (sucesso : boolean, erro : string) : void
}

interface AtualizarCallback { 
    (sucesso : boolean, erro : string, 
        contatoCamposErro? : ContatoErro) : void
}


const contatoApiSave = (contato : Contato, 
    onFinalizar : SalvarCallback, token? : string) => {    
    console.log("contatoApiSave(): acionado");
    apiBase.post("/contato", contato, {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=>{
        onFinalizar(true, "", {});
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro);
    })
}

const contatoApiLoad = (onFinalizar : CarregarCallback, token? : string) => {    
    console.log("contatoApiLoad(): acionado");
    apiBase.get("/contato", {headers: {"Authorization": `Bearer ${token}`}})
    .then(( response : AxiosResponse<any, any>)=>{
        const lista : Contato[] = [];
        for( const chave in response.data) {
            const contato = response.data[chave as keyof Contato];
            contato.id = chave;
            lista.push( contato );
        }
        onFinalizar(true, "", lista);
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro, []);
    })
}

const contatoApiDelete = (id : string, onFinalizar : ApagarCallback, token? : string) => {
    apiBase.delete(`/contato/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=>{
        onFinalizar(true, "");
    })
    .catch(( erro : string )=>{
        onFinalizar(false, erro);
    })
}

const contatoApiUpdate = (id : string, contato : Contato,
    onFinalizar : AtualizarCallback, token? : string) => {
    delete contato.id;
    apiBase.put(`/contato/${id}`, contato, {headers: {"Authorization": `Bearer ${token}`}})
    .then(()=>{
        onFinalizar(true, "", {});
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro);
    })
}

export {contatoApiSave, contatoApiLoad, 
    contatoApiDelete, contatoApiUpdate,
    SalvarCallback, CarregarCallback, 
    ApagarCallback, AtualizarCallback};