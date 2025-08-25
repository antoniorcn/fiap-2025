import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://tdsph-ad96c-default-rtdb.firebaseio.com"
});

interface SalvarCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

interface LerCallback { 
    (sucesso : boolean, mensagem : string, lista? : Array<Contato>) : void;
}

const contatoFetcherSalvar =
 (contato : Contato, callback : SalvarCallback ) : void => {
    apiBase.post( "/contatos.json", contato )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}


const contatoFetcherLer = (callback : LerCallback) : void => { 
    apiBase.get("/contatos.json")
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaContatos = [];
        for ( const chave in resposta.data ){  
            const objContato : Contato = resposta.data[chave as keyof Contato];
            objContato.id = chave;
            listaContatos.push( objContato );
        }
        callback(true, `Foram lidos ${listaContatos.length} contatos`, listaContatos);
    })
    .catch((erro : any)=>callback(false, erro))
}

export {contatoFetcherSalvar, contatoFetcherLer, SalvarCallback, LerCallback}; 