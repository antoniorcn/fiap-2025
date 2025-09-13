import { useContext, useState } from "react";
import { Usuario, UsuarioErros } from "../model/usuario";
import { LoginCallback } from "../fetcher/usuarioFetcher";
import { usuarioLogin, usuarioRegistrar } from "../service/usuarioService";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNavigationProps } from "../navigation/navigationDefinition";
import { MainContext } from "../contexto/contextoPrincipal";

const usuarioLimpo : Usuario = {email: "", senha: ""}

const useUsuarioControl = ( ) => {
    const { abrirSessao } = useContext(MainContext);

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
                abrirSessao( token, usuario.email );
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

    const navegarRegistro = () => { 
        navigation.navigate("Registro");
    }

    const navegarLogin = () => { 
        navigation.navigate("Login");
    }

    const registrar = () => { 
        setLoading(true);
        setUsuarioErro({});
        usuarioRegistrar(usuario, loginCallback);
    }

    return { usuario, usuarioErro,
        loading, mensagem, sucesso,
        navegarRegistro, navegarLogin, registrar,
        handleInput, logar }
}

export { useUsuarioControl };