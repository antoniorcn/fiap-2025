import { Contato } from "../model/Contato";
import axios, { AxiosResponse } from 'axios';
const apiBase = axios.create({
    baseURL: "https://tdsph-ad96c-default-rtdb.firebaseio.com.akshdjkas"
});

interface SalvarCallback { 
    (sucesso : boolean, mensagem : string) : void;
}

// const contatoFetcherSalvar = async (contato : Contato, callback : SalvarCallback ) : 
//     Promise<AxiosResponse<any, any>> => {
//     return apiBase.post( "/contatos.json", contato );
// }

const contatoFetcherSalvar =
 (contato : Contato, callback : SalvarCallback ) : void => {
    apiBase.post( "/contatos.json", contato )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

export {contatoFetcherSalvar, SalvarCallback}; 