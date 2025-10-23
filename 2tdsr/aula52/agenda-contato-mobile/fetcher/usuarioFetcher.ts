import axios, { AxiosResponse } from 'axios';
import { Usuario } from '../model/usuario';
import { serverURL } from './config';

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

const usuarioApi = axios.create({
    baseURL: serverURL
});

interface LoginCallback { 
    (sucesso : boolean, mensagem : string, token? : string) : void;
}

const usuarioApiLogin = (usuario : Usuario, callback : LoginCallback) => { 
    const objLogin = { email : usuario.email, senha: usuario.senha} 
    usuarioApi.post("/login", objLogin)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token : string = resposta.data.token;
        callback( true, "", token );
    })
    .catch(( errors )=>{
        const mensagem = "Usuario ou senha incorretos";
        callback( false, mensagem );
    })
}

const usuarioApiRegistro = (usuario : Usuario, callback : LoginCallback) => { 
    const objLogin = { email : usuario.email, password: usuario.senha,
        returnSecureToken : true } 
    usuarioApi.post(`/accounts:signUp?key=${apiKey}`, objLogin)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token : string = resposta.data.idToken;
        callback( true, "", token );
    })
    .catch(( errors )=>{
        const mensagem = "Erro ao registrar o usuario";
        callback( false, mensagem );
    })
}

export { LoginCallback, usuarioApiLogin, usuarioApiRegistro };