import { contatoApiSave } from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

// const contatoServiceSave = ( nome : string, 
//     telefone : string,
//     email : string) : void => { 
const contatoServiceSave = ( contato : Contato) : void => { 
    console.log("contatoServiceSave(): acionado");
    // contatoApiSave(nome, telefone, email);
    contatoApiSave(contato);
}

export {contatoServiceSave};