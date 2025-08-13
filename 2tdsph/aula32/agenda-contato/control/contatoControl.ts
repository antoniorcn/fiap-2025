import { useState } from "react";
import { Contato } from "../model/Contato";
import { contatoServicoSalvar } from "../service/contatoService";

interface ContatoControlHook { 
    salvar : () => {}
    contato : Contato
    setContato : ( contato : Contato ) => {}
    handleContato : (txt : string, campo : string) => {}
}

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({});
    const [lista, setLista] = useState<Contato[]>([]);
    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function enviarDadosFake(): Promise<boolean> {
        await delay(2000); 
        return true;
    }

    const salvar = () => {
        setLoading(true);
        setLista( ( listaAntiga : Contato[] ) => {
            console.log("Contato salvo");
            // const resultado = contatoServicoSalvar( contato );
            // if (resultado == false) { 
            //    setErro("Erro ao gravar os dados");
            // }
            enviarDadosFake()
            .then(()=>{setErro(null)})
            .catch(()=>{setErro("Erro ao gravar os dados")})
            .finally(()=>{setLoading(false)})
            return [ ...listaAntiga, contato];
        });
    }

    const handleContato = (txt : string, campo : string) => { 
        const obj = {...contato};
        obj[campo as keyof typeof obj] = txt;
        setContato(obj);
    }

    return { loading, salvar, contato, 
        setContato, handleContato, erro };
}

export {useContatoControl};