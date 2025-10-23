import { Contato, ContatoErro, contatoSchema } from "../model/Contato";
import { contatoFetcherSalvar, contatoFetcherLer, contatoFetcherApagar,
    ApagarCallback, 
    contatoFetcherAtualizar,
    AtualizarCallback,
    ImageUploadCallback,
    contatoFetcherImageUpload,
    SalvarCallback} from "../fetcher/contatoFetcher";
import { ValidationError } from "yup";
import { ImagePickerAsset } from "expo-image-picker";
import { ImageInfo } from "../model/ImageInfo";

const contatoServicoSalvar = 
    async ( contato : Contato, callback : SalvarCallback, token? : string ) : Promise<void> => {
        try { 
            await contatoSchema.validate( contato, {abortEarly: false} );
            contatoFetcherSalvar( contato, token );
        } catch ( errors : any ){ 
            if (errors instanceof ValidationError) {
                const contatoErros : ContatoErro = {}
                errors.inner.forEach( ( err : ValidationError ) => {
                    contatoErros[err.path as keyof typeof contatoErros] = err.message;
                });
                callback(false, errors.message, contatoErros);
            }
        }
    }

const contatoServicoLer = ( token? : string ) : Promise<Contato[]> => {
    return contatoFetcherLer( token );
}

const contatoServicoApagar = (id : string, callback : ApagarCallback, token? : string) : void => {
    contatoFetcherApagar(id, callback, token );
}

const contatoImageUpload = async ( asset : ImagePickerAsset, imgInfo : ImageInfo, 
    callback : ImageUploadCallback, token? : string ) : Promise<void> => { 
    await contatoFetcherImageUpload( asset, imgInfo, callback, token );
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