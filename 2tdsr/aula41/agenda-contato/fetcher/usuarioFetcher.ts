import axios, { AxiosResponse } from 'axios';
import { Usuario } from '../model/usuario';

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

const usuarioApi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1"
});

interface LoginCallback { 
    (sucesso : boolean, mensagem : string, token? : string) : void;
}

const usuarioApiLogin = (usuario : Usuario, callback : LoginCallback) => { 
    const objLogin = { email : usuario.email, password: usuario.senha,
        returnSecureToken : true } 
    usuarioApi.post(`/accounts:signInWithPassword?key=${apiKey}`, objLogin)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token : string = resposta.data.idToken;
        callback( true, "", token );
    })
    .catch(( errors )=>{
        const mensagem = "Usuario ou senha incorretos";
        callback( false, mensagem );
    })
}

export { LoginCallback, usuarioApiLogin };