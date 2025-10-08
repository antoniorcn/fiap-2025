import {useEffect, useState, useContext} from 'react';
import { Contato, ContatoErros } from '../model/contato';
import { apagarContato, atualizarContato, carregarContatos, salvarContato } from '../service/contatoService';
import { CallBackApagar, CallBackAtualizar, CallBackCarregar, CallBackSalvar } from '../fetcher/contatoFetcher';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';

const contatoLimpo : Contato = {
        id: undefined, nome: "", telefone: "", email : ""
    };

const useContatoControl = ( navigation : any ) => { 

    const {token} = useContext(ContextoPrincipal);

    const [contato, setContato] = useState<Contato>(contatoLimpo);
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [contatoErro, setContatoErro] = useState<any>({});

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [status, setStatus] = useState<string>("sucesso");

    useEffect ( ()=> { carregar();}, []);

    const callback : CallBackSalvar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
            setStatus("sucesso");
            setContato(contatoLimpo);
            carregar();
        } else { 
            setMensagem(texto);
            setStatus("erro")
            if (erros) {
                setContatoErro(erros);
            }
        }
        setLoading(false);
    }

    const callbackAtualizar : CallBackAtualizar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato atualizado com sucesso");
            setStatus("sucesso");
            setContato(contatoLimpo);
            carregar();
            navigation.navigate("Listagem");
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
        if (contato.id) { 
            atualizarContato(contato.id, contato, callbackAtualizar, token??"");
        } else { 
            salvarContato(contato, callback, token??"");
        }
    }

    const callbackApagar : CallBackApagar = 
    (sucesso : boolean, texto : string) => { 
        if (sucesso) { 
            setMensagem("Contato apagado com sucesso");
            setStatus("sucesso");
            carregar();
        } else { 
            setMensagem(texto);
            setStatus("erro")
        }
        setLoading(false);
    }

    const apagar = (id : string) => {
        setLoading(true);
        setContatoErro({});
        apagarContato(id, callbackApagar, token??"");
    }

    const atualizar = (id : string) => {
        const contatosSelecionados = contatoLista
                            .filter( (c : Contato) => c.id == id )
        if (contatosSelecionados.length > 0) { 
            setContato(contatosSelecionados[0]);
            navigation.navigate("Formulario");
        }
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
        carregarContatos(callbackCarregar, token??"");
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoContato = {...contato};
        novoContato[nomeCampo as keyof typeof novoContato] = texto;
        setContato( novoContato );
    }

    return {
        contato, contatoLista, 
        handlerInput, salvar, carregar, apagar, atualizar,
        loading, mensagem, contatoErro, status
    } 
}

export {useContatoControl};