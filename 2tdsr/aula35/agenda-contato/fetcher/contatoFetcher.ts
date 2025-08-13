import { Contato } from '../model/contato';
import axios from 'axios';

const salvarApi = ( contato : Contato ) => {
    axios.post("https://servidor.com/recurso/contato.json", contato)
    .then( () => {
        console.log("fetcher: Gravado com sucesso");
    } )
    .catch( () => {
        console.log("fetcher: Erro ao gravar o contato");
    } )
}


export {salvarApi};