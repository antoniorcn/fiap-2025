import { useContext, useState} from 'react';
import { usuarioLogin, usuarioRegistro } from '../service/usuarioService';
import { LoginCallback } from '../fetcher/usuarioFetcher';
import { Usuario, UsuarioErro } from '../model/usuario';
import { PrincipalStackNavigationProp } from '../navegacao/navigationDefinition';
import { useNavigation } from '@react-navigation/native';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';

const usuarioLimpo : Usuario = {
        email : "", senha: ""
    };

const useUsuarioControl = () => { 
    const [usuario, setUsuario] = useState<Usuario>(usuarioLimpo);
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErro>({});
    
    const {email, setEmail, 
        token, setToken} = useContext( ContextoPrincipal );

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [status, setStatus] = useState<string>("sucesso");

    const navigation = useNavigation<PrincipalStackNavigationProp>();

    const callback : LoginCallback = 
    (success : boolean, texto : string, tokenRecebido? : string ) => { 
        if (success) { 
            setMensagem("Usuario autenticado com sucesso");
            setStatus("sucesso");
            setToken(tokenRecebido??null);
            setEmail(usuario.email);
            // navigation.navigate("Contato", {screen: "ContatoFormulario"});
            navigation.navigate("Profile");
        } else { 
            setMensagem(texto);
            setStatus("erro");
            setToken(null);
            setEmail(null);
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

    const registrar = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioRegistro( usuario, callback);
    }

    const navegarRegistro = () => { 
        navigation.navigate("Registrar");
    }

    const navegarLogin = () => { 
        navigation.navigate("Login");
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoUsuario = {...usuario};
        novoUsuario[nomeCampo as keyof typeof novoUsuario] = texto;
        setUsuario( novoUsuario );
    }

    return {usuario, usuarioErro,
        loading, mensagem, status,
        handlerInput, logar, registrar,
        navegarRegistro, navegarLogin
    }
}

export {useUsuarioControl};