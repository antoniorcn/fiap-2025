import axios from "axios";
import { Venda } from "./venda";

type VendaCallBackType = ( status : boolean, erro? : string ) => void

const vendasAPI = axios.create({ 
    baseURL: "https://tdsr-329ac-default-rtdb.firebaseio.com"
})

const gravarVendaAPI = async ( venda : Venda ) : Promise<boolean> => {
    try { 
        await vendasAPI.post("/vendas.json", venda);
        return true;
    } catch ( erro ) { 
        console.error( erro );
        return false;
    } finally { 
        return false;
    } 
}


const teste = async() => { 
    // gravarVendaAPI( {id: 0, titulo: "teste", preco: 100.0} )
    // .then( () => {} )
    // .catch( () => {} )
    // .finally( () => {} )
    try { 
        await gravarVendaAPI( {id: 0, titulo: "teste", preco: 100.0} );
        console.log("Venda gravada");
    } catch ( erro ) { 
        console.error( erro );
    }
}

export { gravarVendaAPI, VendaCallBackType }