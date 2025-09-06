import { useContext, useState } from "react";
import { Usuario, UsuarioErros } from "../model/usuario";
import { LoginCallback } from "../fetcher/usuarioFetcher";
import { usuarioLogin } from "../service/usuarioService";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNavigationProps } from "../navigation/navigationDefinition";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";

const usuarioLimpo : Usuario = {email: "", senha: ""}

// const useUsuarioControl = ( 
//         token : string | null, 
//         setToken : ( novoToken : string | null ) => void ) => {
const useUsuarioControl = ( ) => {
    const {token, setToken} = useContext(ContextoPrincipal);

    const navigation = useNavigation<RootScreenNavigationProps>();

    const [usuario, setUsuario] = useState<Usuario>(usuarioLimpo);
    const [usuarioErro, setUsuarioErro] = useState<UsuarioErros>( {} );
    // const [token, setToken] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [sucesso, setSucesso] = useState<boolean>(false);


    const handleInput = (valor : string, nomeCampo : string) => {
        const obj = {...usuario};
        obj[nomeCampo as keyof typeof obj] = valor;
        setUsuario( obj );
    }

    const loginCallback : LoginCallback = 
        (success : boolean, erro : string, 
        token? : string, errosCampos? : UsuarioErros) => {
        if (success) { 
            if (token != null) { 
                setToken( token );
                setMensagem("Autenticado com sucesso");
                console.log("Autenticado Token ==> ", token);
                navigation.navigate("Contato", {screen: "ContatoFormulario"});
            }
        } else { 
            setMensagem( erro );
            setUsuarioErro( errosCampos??{} );
        }
        setSucesso(success);
        setLoading(false);
    }

    const logar = () => {
        setLoading(true);
        setUsuarioErro({});
        usuarioLogin(usuario, loginCallback);
    }

    return { usuario, usuarioErro,
        loading, mensagem, sucesso,
        handleInput, logar }
}

export { useUsuarioControl };