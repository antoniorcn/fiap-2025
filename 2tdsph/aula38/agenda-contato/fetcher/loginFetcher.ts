import { Usuario, UsuarioErro } from "../model/Usuario";
import axios, { AxiosResponse } from 'axios';

const apiBase = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
});

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

interface LogarCallback { 
   (sucesso : boolean, mensagem : string, 
        errosCampos? : UsuarioErro, token? : string) : void;
}

const loginFetcherLogar =
 (usuario : Usuario, callback : LogarCallback ) : void => {
    const objUsuario = { email: usuario.email, password: usuario.senha, 
        returnSecureToken: true }
    console.log("API KEY==>", apiKey);
    console.log("Objeto: ", objUsuario);
    apiBase.post( `/accounts:signInWithPassword?key=${apiKey}`, objUsuario
         )
    .then(( response : AxiosResponse<any, any>)=> {
        console.log( "Ok login feito:", response.data );
        callback(true, "", {}, response.data.idToken)
    })
    .catch((erro : any)=>{ 
        console.error( erro );
        callback(false, erro[0], {}, undefined)
    })
}


export {LogarCallback, loginFetcherLogar}