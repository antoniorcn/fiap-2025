import { Contato, contatoSchema } from "../model/Contato";
import { contatoFetcherSalvar, SalvarCallback } from "../fetcher/contatoFetcher";

const contatoServicoSalvar = 
    ( contato : Contato, callback : SalvarCallback ) : void => {
        contatoSchema.validate( contato )
        .then(()=>{
            contatoFetcherSalvar( contato, callback );
        })
        .catch((errors)=>{
            callback(false, errors.message);
        })
    }
export {contatoServicoSalvar};