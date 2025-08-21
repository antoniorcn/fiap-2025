import {useState} from 'react';
import { Contato, ContatoErros } from '../model/contato';
import { salvarContato } from '../service/contatoService';
import { CallBackSalvar } from '../fetcher/contatoFetcher';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({
        nome: "", telefone: "", email : ""
    });

    const [contatoErro, setContatoErro] = useState<any>({});

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");

    const callback : CallBackSalvar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
        } else { 
            setMensagem(texto);
            if (erros) {
                setContatoErro(erros);
            }
        }
        setLoading(false);
    }

    const salvar = () => {
        setLoading(true);
        setContatoErro({});
        salvarContato(contato, callback);
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoContato = {...contato};
        novoContato[nomeCampo as keyof typeof novoContato] = texto;
        setContato( novoContato );
    }

    return {
        contato, handlerInput,
        salvar, loading, mensagem, contatoErro
    } 
}

export {useContatoControl};