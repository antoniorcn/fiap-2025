import { Usuario, UsuarioErro } from "../model/Usuario";
import axios, { AxiosResponse } from 'axios';

const apiBase = axios.create({
    baseURL: "http://localhost:8080"
});

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

interface LogarCallback { 
   (sucesso : boolean, mensagem : string, 
        errosCampos? : UsuarioErro, token? : string) : void;
}

const loginFetcherLogar =
 (usuario : Usuario, callback : LogarCallback ) : void => {
    const objUsuario = { id: 0, email: usuario.email, senha: usuario.senha, 
        returnSecureToken: true }
    console.log("API KEY==>", apiKey);
    console.log("Objeto: ", objUsuario);
    apiBase.post( "/login", objUsuario
         )
    .then(( response : AxiosResponse<any, any>)=> {
        console.log( "Ok login feito:", response.data );
        callback(true, "", {}, response.data)
    })
    .catch((erro : any)=>{ 
        console.error( erro );
        callback(false, erro[0], {}, undefined)
    })
}


const loginFetcherRegistrar =
 (usuario : Usuario, callback : LogarCallback ) : void => {
    const objUsuario = { id: 0, email: usuario.email, senha: usuario.senha, 
        returnSecureToken: true }
    apiBase.post( "/login/cadastro", objUsuario )
    .then(( response : AxiosResponse<any, any>)=> {
        console.log( "Ok registro concluido:", response.data );
        callback(true, "", {}, response.data)
    })
    .catch((erro : any)=>{ 
        console.error( erro );
        callback(false, erro[0], {}, undefined)
    })
}


export {LogarCallback, loginFetcherLogar, loginFetcherRegistrar}