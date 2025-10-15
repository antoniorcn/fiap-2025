import axios, { AxiosResponse } from 'axios';
import { Usuario, UsuarioErros } from '../model/usuario';

const apiKey = process.env.EXPO_PUBLIC_APIKEY;

const apiLogin = axios.create({
    baseURL: "http://localhost:8080"
});

interface LoginCallback { 
    (sucesso : boolean, erro : string, email? : string,
        token? : string, errosCampos? : UsuarioErros) : void;
}

const usuarioApiLogin = (usuario : Usuario, callback : LoginCallback) => {
    const objRequest = { email: usuario.email, senha: usuario.senha };
    apiLogin.post(`/auth/signin`, objRequest)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token = resposta.data.idToken;
        callback(true, "", usuario.email, token);
    })
    .catch((error : any)=>{
        console.log(error);
        callback(false, "Usuario ou senha invalidos");
    })
}

const usuarioApiRegistrar = (usuario : Usuario, callback : LoginCallback) => {
    const objRequest = { email: usuario.email, senha: usuario.senha, nome: "", perfil: "USER"};
    apiLogin.post(`/auth/signup`, objRequest)
    .then((resposta : AxiosResponse<any, any>)=>{
        const token = resposta.data.idToken;
        callback(true, "", usuario.email, token);
    })
    .catch((error : any)=>{
        console.log("Message: ", error.message);
        console.log("Response: ", error.response);
        console.log("Response Status: ", error.response.status);
        callback(false, "Usuario ou senha invalidos");
    })
}

export { LoginCallback, usuarioApiLogin, usuarioApiRegistrar};

