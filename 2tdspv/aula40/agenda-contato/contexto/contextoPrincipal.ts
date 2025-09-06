import { createContext, ReactNode, useState } from "react";

interface ContextoPrincipalCorpo { 
    token : string | null
    setToken : ( novoToken : string | null ) => void 
}

const contextoPrincipalCorpoVazio : ContextoPrincipalCorpo =
    {   
        token : null, 
        setToken : ( novoToken : string | null)=>{}
    }

const MainContext = createContext(contextoPrincipalCorpoVazio);


function ContextoPrincipalProvider ( { children } : any) : ReactNode {
    const [token, setToken] = useState<string | null>( null );
    return (
        <MainContext.Provider value={{token, setToken}}>
            {children}
        </MainContext.Provider>
    );
} 


export {
    ContextoPrincipalProvider,
    MainContext, 
    ContextoPrincipalCorpo,
    contextoPrincipalCorpoVazio
}