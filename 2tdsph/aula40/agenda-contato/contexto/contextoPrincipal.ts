import { createContext} from 'react';

interface ContextoPrincipalCorpo { 
    token : string | null
    emailProfile : string | null
    setProfile : ( token : string | null, email : string | null ) => void
}

const corpoVazioContextoPrincipal : ContextoPrincipalCorpo = {
    token : null, 
    emailProfile : null,
    setProfile : ( token : string | null, email : string | null ) => {}
}
 
const ContextoPrincipal = createContext(corpoVazioContextoPrincipal);

export { ContextoPrincipalCorpo, corpoVazioContextoPrincipal, ContextoPrincipal };