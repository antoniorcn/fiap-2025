import { Contato, ContatoErro, contatoSchema } from "../model/Contato";
import { contatoFetcherSalvar, contatoFetcherLer, contatoFetcherApagar,
    LerCallback, SalvarCallback, ApagarCallback, 
    contatoFetcherAtualizar,
    AtualizarCallback} from "../fetcher/contatoFetcher";
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

const contatoServicoApagar = (id : string, callback : ApagarCallback) : void => {
    contatoFetcherApagar(id, callback );
}

const contatoServicoAtualizar = 
    ( id : string, contato : Contato, callback : AtualizarCallback ) : void => {
        contatoSchema.validate( contato, {abortEarly: false} )
        .then(()=>{
            contatoFetcherAtualizar( id, contato, callback );
        })
        .catch((errors : ValidationError)=>{
            const contatoErros : ContatoErro = {}
            errors.inner.forEach( ( err : ValidationError ) => {
                contatoErros[err.path as keyof typeof contatoErros] = err.message;
            });
            callback(false, errors.message, contatoErros);
        })
    }

export {contatoServicoSalvar, contatoServicoLer, 
    contatoServicoApagar, contatoServicoAtualizar};