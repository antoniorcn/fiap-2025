import { useState} from 'react';
import { usuarioLogin } from '../service/usuarioService';
import { LoginCallback } from '../fetcher/usuarioFetcher';
import { Usuario, UsuarioErro } from '../model/usuario';

const usuarioLimpo : Usuario = {
        email : "", senha: ""
    };

const useUsuarioControl = () => { 
    const [usuario, setUsuario] = useState<Usuario>(usuarioLimpo);
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [token, setToken] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [status, setStatus] = useState<string>("sucesso");

    const callback : LoginCallback = 
    (success : boolean, texto : string, token? : string ) => { 
        if (success) { 
            setMensagem("Usuario autenticado com sucesso");
            setStatus("sucesso");
            setToken(token??null);
        } else { 
            setMensagem(texto);
            setStatus("erro")
            // if (erros) {
            //     setUsuarioErro(erros);
            // }
        }
        setLoading(false);
    }

    const logar = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioLogin( usuario, callback);
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoUsuario = {...usuario};
        novoUsuario[nomeCampo as keyof typeof novoUsuario] = texto;
        setUsuario( novoUsuario );
    }

    return {usuario, usuarioErro,
        loading, mensagem, status,
        handlerInput, logar
    }
}

export {useUsuarioControl};