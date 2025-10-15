import { createContext } from "react";

type ObjetoContexto = { 
    token : string|undefined,
    email : string|undefined,
    setToken : ( valor : string|undefined ) => void,
    setEmail : ( valor : string|undefined ) => void
}

const padraoContexto : ObjetoContexto = {
    token : "",
    email : "",
    setToken : ( valor : string|undefined ) : void => {},
    setEmail : ( valor : string|undefined ) : void => {}
}; 

const VaiContexto = createContext( padraoContexto );

export {padraoContexto, VaiContexto};