import {useState} from 'react';
import {contatoServiceSave} from '../service/contatoService';
import {salvarCallback} from '../fetcher/contatoFetcher';
import { Contato } from '../model/contato';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>(
        {nome: "", telefone: "", email: ""}
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");

    const handleInput = (valor : string, nomeCampo : string) => {
        const obj = {...contato};
        obj[nomeCampo as keyof typeof obj] = valor;
        setContato( obj );
    }

    const salvar = () => {
        const finalizar : salvarCallback = 
            (sucesso : boolean, erro : string) => {
                if (sucesso) { 
                    setMensagem("Gravado com sucesso")
                } else { 
                    setMensagem("Erro: " + erro);
                }
                setLoading(false);
            }
            
        console.log("useContatoControl:salvar() - acionado");
        setLoading(true);
        contatoServiceSave(contato, finalizar);
    }

    // const salvar = () => {
    //     console.log("useContatoControl:salvar() - acionado");
    //     setLoading(true);
    //     const resposta = contatoServiceSave( contato );
    //     resposta.then(()=>{
    //         setMensagem("Gravado com sucesso");
    //     })
    //     .catch((error : string)=>{
    //         setMensagem("Erro: " + error)
    //     })
    //     .finally(()=>{
    //         setLoading(false);
    //     })
    // }
    return {contato, handleInput, salvar, loading, mensagem};
}

export {useContatoControl};