import { useState } from "react";
import { Contato } from "../model/Contato";
import { contatoServicoSalvar } from "../service/contatoService";
import { SalvarCallback } from "../fetcher/contatoFetcher";

interface ContatoControlHook { 
    salvar : () => {};
    contato : Contato;
    setContato : ( contato : Contato ) => {};
    handleContato : (txt : string, campo : string) => {};
    mensagem : string;
}

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const salvarCallback : SalvarCallback = 
        (sucesso : boolean, msg : string) => {
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
        } else { 
            setMensagem("Erro ao gravar o contato ==> " + msg);
        }
        setLoading(false);
    }
    
    const salvar = () => {
        setLoading(true);
        contatoServicoSalvar( contato, salvarCallback );
    }

    // const salvar = () => {
    //     setLoading(true);
    //     contatoServicoSalvar( contato );
    //     .then(()=>{
    //         setMensagem("Contato gravado com sucesso");
    //     })
    //     .catch(( erro : any )=>{
    //         setMensagem("Erro ao gravar o contato ==> " + erro);
    //     })
    //     .finally(()=>setLoading(false))
    // }

    const handleContato = (txt : string, campo : string) => { 
        const obj = {...contato};
        obj[campo as keyof typeof obj] = txt;
        setContato(obj);
    }

    return { loading, salvar, contato, 
        setContato, handleContato, mensagem };
}

export {useContatoControl};