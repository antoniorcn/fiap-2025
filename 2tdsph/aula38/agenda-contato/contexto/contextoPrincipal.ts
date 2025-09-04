import { createContext, ReactNode, useState } from 'react';

interface ContextoPrincipalCorpo { 
    token : string | null
    setToken : ( token : string | null ) => void
}

const corpoVazioContextoPrincipal : ContextoPrincipalCorpo = {
    token : null, 
    setToken : ( token : string | null ) => {}
}
 
const ContextoPrincipal = createContext(corpoVazioContextoPrincipal);

// const ContextoPrincipalProvider = ({ children } : ReactNode) => {
//   const [token, setToken] = useState<string>("");

//   return (
//     <ContextoPrincipal.Provider value={{ token, setToken }}>
//       {children}
//     </ContextoPrincipal.Provider>
//   );
// };

export { ContextoPrincipalCorpo, corpoVazioContextoPrincipal, ContextoPrincipal };