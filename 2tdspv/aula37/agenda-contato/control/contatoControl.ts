import {useState} from 'react';
import {contatoServiceLoad, contatoServiceSave} from '../service/contatoService';
import {CarregarCallback, SalvarCallback} from '../fetcher/contatoFetcher';
import { Contato, ContatoErro } from '../model/contato';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>(
        {nome: "", telefone: "", email: ""}
    );
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
                } else { 
                    setMensagem("Erro: " + erro);
                    setSucesso(false);
                    console.log(contatoCamposErro)
                    setContatoErro(contatoCamposErro??{})
                }
                setLoading(false);
            }
        console.log("useContatoControl:salvar() - acionado");
        setLoading(true);
        contatoServiceSave(contato, finalizar);
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

    return {contato, contatoLista, handleInput, 
        salvar, carregar,
        sucesso, loading, mensagem, contatoErro};
}

export {useContatoControl};''