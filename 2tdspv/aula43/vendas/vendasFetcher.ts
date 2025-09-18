import axios from 'axios';
import { Venda } from './vendas';

const vendasAPI = axios.create({
    baseURL: "https://tdspv-a8c0e-default-rtdb.firebaseio.com"
});

const salvarVendaAPI = async ( venda : Venda ) : Promise<boolean> => { 
    try { 
        await vendasAPI.post("/vendas.json", venda);
        return true;
    } catch (erro) {
        return false;
    }
}

export {salvarVendaAPI};

