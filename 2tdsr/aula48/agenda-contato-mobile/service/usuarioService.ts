import { LoginCallback, usuarioApiLogin, usuarioApiRegistro } from "../fetcher/usuarioFetcher";
import { Usuario } from "../model/usuario";

const usuarioLogin = (usuario : Usuario, callback : LoginCallback) => { 
    usuarioApiLogin( usuario, callback );
}

const usuarioRegistro = (usuario : Usuario, callback : LoginCallback) => { 
    usuarioApiRegistro( usuario, callback );
}

export {usuarioLogin, usuarioRegistro};