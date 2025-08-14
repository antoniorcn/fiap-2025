import {useState} from 'react';
import { Contato } from '../model/contato';
import { salvarContato } from '../service/contatoService';

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({
        nome: "", telefone: "", email : ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");

    const salvar = () => {
        setLoading(true);
        salvarContato( contato )
        .then(()=>{
            setMensagem("Contato foi gravado com sucesso");
        })
        .catch((erro : any)=>{
            setMensagem("Erro ao gravar o contato: " + erro);
        })
        .finally(()=>{
            setLoading(false);
        })
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