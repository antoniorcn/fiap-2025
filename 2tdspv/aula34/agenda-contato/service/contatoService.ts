import { AxiosResponse } from 'axios';
import { contatoApiSave, salvarCallback } from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

const contatoServiceSave = (contato : Contato, 
        onFinalizar : salvarCallback) => { 
    console.log("contatoServiceSave(): acionado");
    contatoApiSave(contato, onFinalizar);
}

// const contatoServiceSave = ( contato : Contato) :
//     Promise<AxiosResponse<any, any>> => { 
//     console.log("contatoServiceSave(): acionado");
//     return contatoApiSave(contato);
// }

export {contatoServiceSave};