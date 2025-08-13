import { Contato } from "../model/Contato";
import { contatoFetcherSalvar } from "../fetcher/contatoFetcher";

const contatoServicoSalvar = ( contato : Contato ) : boolean => {
    try {
        contatoFetcherSalvar( contato );
        return true;
    } catch(e) { 
        return false;
    }
}

export {contatoServicoSalvar};