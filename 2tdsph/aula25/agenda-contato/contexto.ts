import Contato from './Contato';
import React, {createContext} from 'react';

interface MeuContextoInterface { 
    lista : Contato[],
    setLista : ( lista : Contato[] ) => void
    carregar : () => void
    gravar : (nome :string, telefone : string, email : string) => void
};

export const valorPadrao : MeuContextoInterface = { 
    lista: [],
    setLista : ( lista : Contato[] ) => {},
    carregar : () => {},
    gravar : () => {}
};

const MeuContexto = createContext( valorPadrao );

export default MeuContexto