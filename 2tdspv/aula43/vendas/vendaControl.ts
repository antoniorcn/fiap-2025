import { useState } from "react";
import { gravarVenda, VendasErro } from "./vendasService"
import { Venda } from "./vendas";


const useVendaControl = () => { 

    const [titulo, setTitulo] = useState<string>("");
    const [preco, setPreco] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [erros, setErros] = useState<VendasErro>({status: true});

    const salvar = async () => { 
        const obj : Venda = { titulo, 
                            preco : parseFloat( preco ) } 
        try { 
            const resposta = await gravarVenda( obj );
            setErros( resposta );
            if (resposta.status) { 
                setStatus("Venda gravada com sucesso");
            } else { 
                setStatus("Erro ao gravar a venda");
            }
        } catch (erro) { 
            setStatus("Erro ao gravar a venda");
        }
    }

    return { titulo, setTitulo, 
        preco, setPreco,
        salvar, status, erros
    } 
}

export { useVendaControl };