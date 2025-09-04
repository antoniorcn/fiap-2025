import { LoginCallback, usuarioApiLogin } from "../fetcher/usuarioFetcher";
import { Usuario } from "../model/usuario";

const usuarioLogin = (usuario : Usuario, callback : LoginCallback) => { 
    usuarioApiLogin( usuario, callback );
}

export {usuarioLogin};