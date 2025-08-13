import { salvarApi } from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

const salvarContato = ( contato : Contato )=> {
    salvarApi( contato );
    console.log("servico: Contato gravado com sucesso");
}

export {salvarContato};