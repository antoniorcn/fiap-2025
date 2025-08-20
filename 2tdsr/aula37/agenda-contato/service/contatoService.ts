import { CallBackSalvar, salvarApi } from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

const salvarContato = ( contato : Contato, callback : CallBackSalvar )=> {
    console.log("servico: Contato gravado com sucesso");
    return salvarApi(contato, callback)   
}

export {salvarContato};