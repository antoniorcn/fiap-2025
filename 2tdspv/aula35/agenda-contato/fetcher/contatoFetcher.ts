import axios from 'axios';
import { Contato } from '../model/contato';

interface salvarCallback { 
    (sucesso : boolean, erro : string) : void
}

const contatoApiSave = (contato : Contato, 
    onFinalizar : salvarCallback) => {    
    console.log("contatoApiSave(): acionado");
    axios.post(
        "https://tdspv-a8c0e-default-rtdb.firebaseio.com/contato.json",
        contato
    )
    .then(()=>{
        onFinalizar(true, "");
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro);
    })
}

// const contatoApiSave = ( contato : Contato) : 
//     Promise<AxiosResponse<any, any>> => {    
//     console.log("contatoApiSave(): acionado");
//     return axios.post(
//         "https://tdspv-a8c0e-default-rtdb.firebaseio.com/contato.json",
//         contato
//     )
// }

export {contatoApiSave, salvarCallback};