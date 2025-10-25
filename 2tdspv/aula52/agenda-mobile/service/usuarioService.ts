import { ValidationError } from "yup";
import { LoginCallback, usuarioApiLogin, usuarioApiRegistrar } from "../fetcher/usuarioFetcher";
import { Usuario, usuarioSchema, UsuarioErros } from "../model/usuario";

const usuarioLogin = (usuario : Usuario, 
    callback : LoginCallback) => {
    
    usuarioSchema.validate( usuario, {abortEarly : false} )
    .then(()=>{
        usuarioApiLogin( usuario, callback );
    })
    .catch(( erros : ValidationError )=>{
        const objErroCampos : UsuarioErros = {};
        erros.inner.forEach( ( err : ValidationError ) => { 
            const nomeCampo = err.path;
            const erroCampo = err.message;
            objErroCampos[nomeCampo as keyof typeof objErroCampos] = erroCampo;
        })
        callback( false, erros.message, undefined, undefined, objErroCampos );
    })
}

const usuarioRegistrar = (usuario : Usuario, 
    callback : LoginCallback) => {
    
    usuarioSchema.validate( usuario, {abortEarly : false} )
    .then(()=>{
        usuarioApiRegistrar( usuario, callback );
    })
    .catch(( erros : ValidationError )=>{
        const objErroCampos : UsuarioErros = {};
        erros.inner.forEach( ( err : ValidationError ) => { 
            const nomeCampo = err.path;
            const erroCampo = err.message;
            objErroCampos[nomeCampo as keyof typeof objErroCampos] = erroCampo;
        })
        callback( false, erros.message, undefined, undefined, objErroCampos );
    })
}

export { usuarioLogin, usuarioRegistrar };