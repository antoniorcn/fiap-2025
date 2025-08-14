import { salvarApi } from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

const salvarContato = ( contato : Contato )=> {
    console.log("servico: Contato gravado com sucesso");
    return salvarApi( contato )   
}

export {salvarContato};