import axios, { AxiosResponse } from 'axios';
import { Usuario, UsuarioErros } from '../model/usuario';

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
});

interface LoginCallback { 
    (sucesso : boolean, erro : string, 
        token? : string, errosCampos? : UsuarioErros) : void;
}

const usuarioApiLogin = (usuario : Usuario, callback : LoginCallback) => {
    const objRequest = { email: usuario.email, password: usuario.senha, 
        returnSecureToken : true };
    apiLogin.post(`/accounts:signInWithPassword?key=${apiKey}`, objRequest)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token = resposta.data.idToken;
        callback(true, "", token);
    })
    .catch((erro : string)=>{
        callback(false, erro);
    })
}

export { LoginCallback, usuarioApiLogin };

