import { Contato } from "../model/Contato";
import axios from 'axios';
const apiBase = axios.create({
    baseURL: "https://tdsph-ad96c-default-rtdb.firebaseio.com"
});
const contatoFetcherSalvar = async (contato : Contato ) => {
    return apiBase.post( "/contatos.json", contato );
}
export {contatoFetcherSalvar}; 