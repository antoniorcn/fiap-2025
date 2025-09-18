import { ValidationError } from "yup";
import { Venda, VendaSchema } from "./vendas";
import { salvarVendaAPI  } from "./vendasFetcher";

type VendasErro = { 
    status : boolean,
    titulo? : string,
    preco? : string
}

const gravarVenda = async ( venda : Venda) : 
    Promise<VendasErro> => { 
    try {
        await VendaSchema.validate( venda, {abortEarly: false} );
        const resultadoApi = await salvarVendaAPI( venda );
        if (resultadoApi) { 
            return { status: true };
        }
    } catch ( erro ) { 
        if ( erro instanceof ValidationError ) { 
            const o : VendasErro = {status : false};
            erro.inner.forEach( (err : ValidationError )=> {
                const nomeCampo = err.path;
                o[nomeCampo as keyof typeof o] = err.message;
            })
            console.log("Erro de validacao: ", erro.message);
            return o;
        }
        return { status: false };
    }
    
    // try { 
        
        // return true;
    // } catch( erro ){ 
        // return false;
    // }
}

export { gravarVenda, VendasErro };