import { useState } from "react";
import { Contato, ContatoErro } from "../model/Contato";
import { contatoServicoLer, contatoServicoSalvar } from "../service/contatoService";
import { LerCallback, SalvarCallback } from "../fetcher/contatoFetcher";

interface ContatoControlHook { 
    salvar : () => {};
    contato : Contato;
    setContato : ( contato : Contato ) => {};
    handleContato : (txt : string, campo : string) => {};
    mensagem : string;
}

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({});
    const [contatoErro, setContatoErro] = useState<ContatoErro>({});
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);

    const salvarCallback : SalvarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato gravado com sucesso");
            // setSucesso(true);
        } else { 
            setMensagem(msg);
            // if (errosCampos) {
            //     setContatoErro( errosCampos )
            // }
            setContatoErro( errosCampos??{} );
            //setSucesso(false);
            // setContatoErro( errosCampos?errosCampos : {} );
        }
        setSucesso(success);
        setLoading(false);
    }

    const lerCallback : LerCallback = 
        (success : boolean, msg : string, lista? : Array<Contato>) => {
        console.log("lerCallback() acionado");
        setSucesso(success);
        setMensagem(msg);
        if ( lista ) { 
            setContatoLista( lista );
            console.log("Lista de contatos ==> ", lista);
        }
        setLoading(false);
    } 
    
    const salvar = () => {
        setLoading(true);
        setContatoErro({});
        contatoServicoSalvar( contato, salvarCallback );
    }

    const ler = () => { 
        setLoading(true);
        setContatoErro({});
        contatoServicoLer( lerCallback );
    }

    const handleContato = (txt : string, campo : string) => { 
        const obj = {...contato};
        obj[campo as keyof typeof obj] = txt;
        setContato(obj);
    }

    return { loading, salvar, ler, contato, contatoErro, contatoLista,
        setContato, handleContato, mensagem, sucesso };
}

export {useContatoControl};