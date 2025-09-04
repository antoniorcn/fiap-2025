import { useState } from "react";
import { Contato, ContatoErro } from "../model/Contato";
import { contatoServicoApagar, contatoServicoAtualizar, contatoServicoLer, contatoServicoSalvar } from "../service/contatoService";
import { ApagarCallback, AtualizarCallback, LerCallback, SalvarCallback } from "../fetcher/contatoFetcher";
import { useNavigation } from "@react-navigation/native";
import { ContatoScreenNavigationProp } from "../navigation/navigationParams";

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

    const navigation = useNavigation<ContatoScreenNavigationProp>();

    const salvarCallback : SalvarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato gravado com sucesso");
            ler();
            navigation.navigate("ContatoLista");
        } else { 
            setMensagem(msg);
            setContatoErro( errosCampos??{} );
        }
        setSucesso(success);
        setLoading(false);
    }

    const atualizarCallback : AtualizarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato atualizado com sucesso");
            ler();
            navigation.navigate("ContatoLista");
        } else { 
            setMensagem(msg);
            setContatoErro( errosCampos??{} );
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

    const apagarCallback : ApagarCallback = 
        (success : boolean, msg : string) => {
        console.log("apagarCallback() acionado");
        setSucesso(success);
        if (success) { 
            setMensagem("Contato apagado com sucesso");
        } else { 
            setMensagem(msg);
        }
        setLoading(false);
    } 
    
    const salvar = () => {
        setLoading(true);
        setContatoErro({});
        if (contato.id == null) {
            contatoServicoSalvar( contato, salvarCallback );
        } else { 
            contatoServicoAtualizar( contato.id, contato, atualizarCallback );
        }
    }

    const ler = () => { 
        setLoading(true);
        setContatoErro({});
        contatoServicoLer( lerCallback );
    }

    const apagar = (id : string) => { 
        setLoading(true);
        setContatoErro({});
        contatoServicoApagar( id, apagarCallback);
    }

    const atualizar = (id : string) => { 
        setContatoErro({});
        const contatosFiltrados = contatoLista.filter( 
            (c : Contato)=> c.id == id
        );
        if (contatosFiltrados.length > 0) { 
            setContato( contatosFiltrados[0] );
            navigation.navigate("Contato", { screen: "ContatoFormulario"});
        }
    }    

    const handleContato = (txt : string, campo : string) => { 
        const obj = {...contato};
        obj[campo as keyof typeof obj] = txt;
        setContato(obj);
    }

    return { loading, mensagem, sucesso,
        contato, contatoErro, contatoLista,
        salvar, ler, apagar, atualizar, setContato, handleContato};
}

export {useContatoControl};