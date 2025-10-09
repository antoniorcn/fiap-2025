import { Contato, ContatoErro, contatoSchema } from "../model/Contato";
import { contatoFetcherSalvar, contatoFetcherLer, contatoFetcherApagar,
    LerCallback, SalvarCallback, ApagarCallback, 
    contatoFetcherAtualizar,
    AtualizarCallback,
    ImageUploadCallback,
    contatoFetecherImageUpload} from "../fetcher/contatoFetcher";
import { ValidationError } from "yup";
import { ImagePickerAsset } from "expo-image-picker";
import { ImageInfo } from "../model/ImageInfo";

const contatoServicoSalvar = 
    ( contato : Contato, callback : SalvarCallback, token? : string ) : void => {
        contatoSchema.validate( contato, {abortEarly: false} )
        .then(()=>{
            contatoFetcherSalvar( contato, callback, token );
        })
        .catch((errors : ValidationError)=>{
            const contatoErros : ContatoErro = {}
            errors.inner.forEach( ( err : ValidationError ) => {
                contatoErros[err.path as keyof typeof contatoErros] = err.message;
            });
            callback(false, errors.message, contatoErros);
        })
    }

const contatoServicoLer = (callback : LerCallback, token? : string) : void => {
    contatoFetcherLer( callback, token );
}

const contatoServicoApagar = (id : string, callback : ApagarCallback, token? : string) : void => {
    contatoFetcherApagar(id, callback, token );
}

const contatoImageUpload = ( asset : ImagePickerAsset, imgInfo : ImageInfo, callback : ImageUploadCallback ) : void => { 
    contatoFetecherImageUpload( asset, imgInfo, callback );
}

const contatoServicoAtualizar = 
    ( id : string, contato : Contato, callback : AtualizarCallback, token? : string) : void => {
        contatoSchema.validate( contato, {abortEarly: false} )
        .then(()=>{
            contatoFetcherAtualizar( id, contato, callback, token );
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
    contatoServicoApagar, contatoServicoAtualizar,
    contatoImageUpload};