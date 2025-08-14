import { Contato } from '../model/contato';
import axios from 'axios';

const salvarApi = ( contato : Contato ) => {
    console.log("fetcher: executado o gravar");
    return axios.post("https://abobrinhatdsr-329ac-default-rtdb.firebaseio.com/contato.json", contato);
}


export {salvarApi};