import {useState} from 'react';
import { Contato } from '../model/contato';
import { salvarContato } from '../service/contatoService';
import { CallBackSalvar } from '../fetcher/contatoFetcher';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({
        nome: "", telefone: "", email : ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");

    const callback : CallBackSalvar = 
    (sucesso : boolean, texto : string ) => { 
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
        } else { 
            setMensagem("Erro: " + texto);
        }
        setLoading(false);
    }

    const salvar = () => {
        setLoading(true);
        salvarContato(contato, callback);
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoContato = {...contato};
        novoContato[nomeCampo as keyof typeof novoContato] = texto;
        setContato( novoContato );
    }

    return {
        contato, handlerInput,
        salvar, loading, mensagem
    } 
}

export {useContatoControl};