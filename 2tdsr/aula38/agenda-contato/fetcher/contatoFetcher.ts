import { Contato } from '../model/contato';
import axios from 'axios';

interface CallBackSalvar {
    (sucesso : boolean, mesagem : string, erros? : object ) : void
}

const salvarApi = ( contato : Contato, callback : CallBackSalvar ) => {
    console.log("fetcher: executado o gravar");
    return axios.post("https://tdsr-329ac-default-rtdb.firebaseio.com/contato.json", 
        contato)
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}


export {salvarApi, CallBackSalvar};