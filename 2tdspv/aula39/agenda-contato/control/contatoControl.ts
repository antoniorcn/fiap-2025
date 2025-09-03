import {useState} from 'react';
import {contatoServiceDelete, contatoServiceLoad, contatoServiceSave, contatoServiceUpdate} from '../service/contatoService';
import {ApagarCallback, AtualizarCallback, CarregarCallback, SalvarCallback} from '../fetcher/contatoFetcher';
import { Contato, ContatoErro } from '../model/contato';

const contatoLimpo : Contato = 
    {id: undefined, nome: "", telefone: "", email: ""};

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>(contatoLimpo);
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [contatoErro, setContatoErro] = useState<ContatoErro>(
        {}
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [sucesso, setSucesso] = useState<boolean>(false);

    const handleInput = (valor : string, nomeCampo : string) => {
        const obj = {...contato};
        obj[nomeCampo as keyof typeof obj] = valor;
        setContato( obj );
    }

    const salvar = () => {
        const finalizar : SalvarCallback = 
            (resultadoSucesso : boolean, erro : string,
                contatoCamposErro? : ContatoErro
            ) => {
                if (resultadoSucesso) { 
                    setMensagem("Gravado com sucesso");
                    setSucesso(true);
                    setContatoErro({});
                    setContato(contatoLimpo);
                } else { 
                    setMensagem("Erro: " + erro);
                    setSucesso(false);
                    console.log(contatoCamposErro)
                    setContatoErro(contatoCamposErro??{})
                }
                setLoading(false);
            }

        const finalizarUpdate : AtualizarCallback = 
            (resultadoSucesso : boolean, erro : string,
                contatoCamposErro? : ContatoErro
            ) => {
                if (resultadoSucesso) { 
                    setMensagem("Atualizado com sucesso");
                    setSucesso(true);
                    setContatoErro({});
                    setContato(contatoLimpo);
                } else { 
                    setMensagem("Erro: " + erro);
                    setSucesso(false);
                    console.log(contatoCamposErro)
                    setContatoErro(contatoCamposErro??{})
                }
                setLoading(false);
            }            
        setLoading(true);
        if (contato.id) { 
            contatoServiceUpdate(contato.id, contato, finalizarUpdate)
        } else { 
            contatoServiceSave(contato, finalizar);
        }
    }

    const carregar = () => {
        const finalizarCarregamento : CarregarCallback = 
        (resultadoSucesso : boolean, erro : string,
            lista : Array<Contato>
        ) => {
            if (resultadoSucesso) { 
                setMensagem(`Foram lidos ${lista.length} contatos`);
                setSucesso(true);
                setContatoErro({});
                setContatoLista( lista );
            } else { 
                setMensagem("Erro: " + erro);
                setSucesso(false);
            }
            setLoading(false);
        }
        setLoading(true);
        contatoServiceLoad( finalizarCarregamento );
    }

    const apagar = (id : string) => { 
        const finalizarApagar : ApagarCallback = 
        (success : boolean, erro : string) => { 
            if (success) { 
                setMensagem("Contato foi apagado com sucesso");
                setSucesso(true);
            } else { 
                setMensagem( erro );
                setSucesso(false);
            }
            setLoading(false);
        }
        setLoading(true);
        contatoServiceDelete(id, finalizarApagar);
    }

    const atualizar = ( id : string ) => {
        setContato(contatoLimpo);
        contatoLista.forEach((contato : Contato)=> {
            if (contato.id === id) { 
                setContato( contato );
            }
        });
    }

    return {contato, contatoLista, handleInput, 
        salvar, carregar, apagar, atualizar, 
        sucesso, loading, mensagem, contatoErro};
}

export {useContatoControl};''