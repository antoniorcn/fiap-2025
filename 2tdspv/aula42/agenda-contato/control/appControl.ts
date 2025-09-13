import { useState, useEffect } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";


const useAppControl = () => { 
    const [token, setToken] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const asyncStorage = useAsyncStorage("AGENDA_CONTATO_LOGIN");

    useEffect(()=>{
        asyncStorage.getItem()
        .then(( strDados : string | null )=>{
            if (strDados != null){ 
                const obj = JSON.parse( strDados );
                abrirSessao(obj.token, obj.email);
                console.log("Carregado dados do AsyncStorage: ");
                console.log("Email: ", obj.email);
                console.log("Token: ", obj.token);
            }
        })
        .catch(( erro )=>{
            console.log("Erro ao carregar os dados do usuario==> ", erro);
        })
        .finally(()=> {
            setLoading(false);
        })
    }, [])

    const fecharSessao = () => { 
        setToken( null );
        setEmail( null );
        asyncStorage.setItem( 
            JSON.stringify({token: null, email : null})
        );
    }

    const abrirSessao = (tokenSessao : string, emailSessao : string) => { 
        setToken(tokenSessao);
        setEmail(emailSessao);
        asyncStorage.setItem( 
            JSON.stringify({token: tokenSessao, email : emailSessao})
        );
    }

    return { loading, token, setToken, email, setEmail, 
        fecharSessao, abrirSessao }
}

export { useAppControl }