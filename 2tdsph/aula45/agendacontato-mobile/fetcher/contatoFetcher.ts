import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "http://localhost:8080"
});

interface SalvarCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

interface LerCallback { 
    (sucesso : boolean, mensagem : string, lista? : Array<Contato>) : void;
}

interface ApagarCallback { 
    (sucesso : boolean, mensagem : string) : void;
}

interface AtualizarCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

const contatoFetcherSalvar =
 (contato : Contato, callback : SalvarCallback, token? : string ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.post( "/contato", contato, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}


const contatoFetcherApagar =
 (id : string, callback : ApagarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.delete( `/contato/${id}`, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const contatoFetcherAtualizar =
 (id : string, contato : Contato, callback : AtualizarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.put( `/contato/${id}`, contato, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const contatoFetcherLer = (callback : LerCallback, token? : string ) : void => { 
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.get("/contato", config)
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaContatos = [];
        for ( const objContato of resposta.data ){  
            listaContatos.push( objContato );
        }
        callback(true, `Foram lidos ${listaContatos.length} contatos`, listaContatos);
    })
    .catch((erro : any)=>callback(false, erro))
}

export {contatoFetcherSalvar, contatoFetcherLer, 
    contatoFetcherApagar, contatoFetcherAtualizar,
    SalvarCallback, LerCallback, ApagarCallback, AtualizarCallback}; 