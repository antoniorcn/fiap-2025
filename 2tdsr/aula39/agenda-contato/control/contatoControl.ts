import {useState} from 'react';
import { Contato, ContatoErros } from '../model/contato';
import { carregarContatos, salvarContato } from '../service/contatoService';
import { CallBackCarregar, CallBackSalvar } from '../fetcher/contatoFetcher';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({
        nome: "", telefone: "", email : ""
    });
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [contatoErro, setContatoErro] = useState<any>({});

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [status, setStatus] = useState<string>("sucesso");

    const callback : CallBackSalvar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
            setStatus("sucesso")
        } else { 
            setMensagem(texto);
            setStatus("erro")
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

    const callbackCarregar : CallBackCarregar = 
    (sucesso : boolean, texto : string, lista : Contato[] ) => { 
        if (sucesso) { 
            setStatus("sucesso")
            setMensagem(`Foram carregados ${lista.length} contatos`);
            setContatoLista( lista );
        } else { 
            setStatus("erro")
            setMensagem(texto);
        }
        setLoading(false);
    }

    const carregar = () => {
        setLoading(true);
        setContatoErro({});
        carregarContatos(callbackCarregar);
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoContato = {...contato};
        novoContato[nomeCampo as keyof typeof novoContato] = texto;
        setContato( novoContato );
    }

    return {
        contato, contatoLista, 
        handlerInput, salvar, carregar, 
        loading, mensagem, contatoErro, status
    } 
}

export {useContatoControl};