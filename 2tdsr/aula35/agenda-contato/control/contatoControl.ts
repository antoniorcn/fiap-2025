import {useState} from 'react';
import { Contato } from '../model/contato';
import { salvarContato } from '../service/contatoService';

const useContatoControl = () => { 
    const [nome, setNome] = useState<string | undefined>("");
    const [telefone, setTelefone] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");


    const salvar = () => { 
        const contato : Contato = {nome, telefone, email};
        salvarContato( contato );
        console.log("control: Contato gravado com sucesso");
    }

    return {
        nome, setNome, 
        telefone, setTelefone, 
        email, setEmail,
        salvar
    } 
}

export {useContatoControl};