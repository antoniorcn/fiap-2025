import { createContext } from "react";

type CorpoContextoPrincipal = { 
    token : string | null,
    setToken : (valorToken : string | null) => void,
    email : string | null, 
    setEmail : (valorEmail : string | null) => void,
    fecharSessao : () => void
}

const corpoVazioContextoPrincipal : 
        CorpoContextoPrincipal = { 
            token : null,
            email : null,
            setToken : (valorToken : string | null) => {},
            setEmail : (valorEmail : string | null) => {},
            fecharSessao : () => {}
        }


const ContextoPrincipal = createContext(
        corpoVazioContextoPrincipal
);

export { CorpoContextoPrincipal, corpoVazioContextoPrincipal, 
    ContextoPrincipal
 }