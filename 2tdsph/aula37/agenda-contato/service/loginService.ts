import { Usuario, UsuarioErro, usuarioSchema } from "../model/Usuario";
import { loginFetcherLogar, LogarCallback } from "../fetcher/loginFetcher";
import { ValidationError } from "yup";

const loginServicoLogar = 
    ( usuario : Usuario, callback : LogarCallback ) : void => {
        usuarioSchema.validate( usuario, {abortEarly: false} )
        .then(()=>{
            loginFetcherLogar( usuario, callback );
        })
        .catch((errors : ValidationError)=>{
            const usuarioErros : UsuarioErro = {}
            errors.inner.forEach( ( err : ValidationError ) => {
                usuarioErros[err.path as keyof typeof usuarioErros] = err.message;
            });
            callback(false, errors.message, usuarioErros);
        })
    }

export {loginServicoLogar};