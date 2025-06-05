import Contato from './Contato';
import React, {createContext} from 'react';

interface MeuContextoInterface { 
    lista : Contato[],
    contato : Contato,
    handleContato : (campo : string, valor : any) => void
    setLista : ( lista : Contato[] ) => void
    carregar : () => void
    gravar : () => void,
    atualizar : ( obj : Contato ) => void,
    apagar : ( obj : Contato ) => void
};

export const valorPadrao : MeuContextoInterface = { 
    lista: [],
    contato : {nome: "", telefone : "", email : ""},
    handleContato : (campo : string, valor : any) => {},
    setLista : ( lista : Contato[] ) => {},
    carregar : () => {},
    gravar : () => {},
    atualizar : ( {} : Contato ) => {},
    apagar : ( {} : Contato ) => {},
    
};

const MeuContexto = createContext( valorPadrao );

export default MeuContexto