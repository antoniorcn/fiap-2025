import { createContext } from "react";

interface ContextoPrincipalCorpo { 
    token : string | null
    setToken : ( novoToken : string | null ) => void
    email : string | null
    setEmail : ( novoEmail : string | null ) => void
    fecharSessao : () => void
    abrirSessao : ( novoToken : string , novoEmail : string ) => void
}

const contextoPrincipalCorpoVazio : ContextoPrincipalCorpo =
    {   
        token : null, 
        setToken : ( novoToken : string | null)=>{},
        email : null,
        setEmail : ( novoEmail : string | null)=>{},
        fecharSessao : () => {},
        abrirSessao : ( novoToken : string, novoEmail : string ) => {}
    }

const MainContext = createContext(contextoPrincipalCorpoVazio);


export {
    MainContext, 
    ContextoPrincipalCorpo,
    contextoPrincipalCorpoVazio
}