import { Contato, ContatoErro, contatoSchema } from "../model/Contato";
import { contatoFetcherSalvar, contatoFetcherLer, 
    LerCallback, SalvarCallback } from "../fetcher/contatoFetcher";
import { ValidationError } from "yup";

const contatoServicoSalvar = 
    ( contato : Contato, callback : SalvarCallback ) : void => {
        contatoSchema.validate( contato, {abortEarly: false} )
        .then(()=>{
            contatoFetcherSalvar( contato, callback );
        })
        .catch((errors : ValidationError)=>{
            const contatoErros : ContatoErro = {}
            errors.inner.forEach( ( err : ValidationError ) => {
                contatoErros[err.path as keyof typeof contatoErros] = err.message;
            });
            callback(false, errors.message, contatoErros);
        })
    }

const contatoServicoLer = (callback : LerCallback) : void => {
    contatoFetcherLer( callback );
}

export {contatoServicoSalvar, contatoServicoLer};