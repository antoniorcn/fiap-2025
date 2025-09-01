import React, { useState } from 'react';
import { Usuario, UsuarioErro } from '../model/Usuario';
import { LogarCallback } from '../fetcher/loginFetcher';
import { loginServicoLogar } from '../service/loginService';

const useLoginControl = () => { 
    const [token, setToken] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({
        email: "", senha: ""
    });

    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);


    const handleLogin = (txt : string, campo : string) => { 
        const obj = {...usuario};
        obj[campo as keyof typeof obj] = txt;
        setUsuario(obj);
    }
    

    const login = () => { 
        const callback : LogarCallback = (success : boolean, 
            msg : string, errosCampos? : UsuarioErro, 
            token? : string) => { 
                if (success && token != undefined) { 
                    setToken(token);
                    setMensagem("Usuario logado com sucesso");
                } else { 
                    console.log( msg );
                    setMensagem("Erro ao fazer o login");
                    if (errosCampos){ 
                        setUsuarioErro( errosCampos );
                    }
                }
                setSucesso(success);
                setLoading(false);
            }        

        setLoading(true);
        loginServicoLogar( usuario, callback );
    }

    return { usuario, handleLogin, login, sucesso, mensagem, loading }
}

export {useLoginControl};