import {useState} from 'react';
import {contatoServiceSave} from '../service/contatoService';
import { Contato } from '../model/contato';

const useContatoControl = () => { 
    // const [nome, setNome] = useState<string>("");
    // const [telefone, setTelefone] = useState<string>("");
    // const [email, setEmail] = useState<string>("");

    const [contato, setContato] = useState<Contato>(
        {nome: "", telefone: "", email: ""}
    );

    const handleInput = (valor : string, nomeCampo : string) => {
        const obj = {...contato};
        obj[nomeCampo as keyof typeof obj] = valor;
        setContato( obj );
    }

    const salvar = () => {
        console.log("useContatoControl:salvar() - acionado");
        contatoServiceSave( contato );
        // contatoServiceSave(nome, telefone, email);
    }
    return {contato, handleInput, salvar};

    // return {contato, setContato, salvar};
    // return { 
    //     nome, setNome, telefone, setTelefone,
    //     email, setEmail, salvar
    // }
}

export {useContatoControl};