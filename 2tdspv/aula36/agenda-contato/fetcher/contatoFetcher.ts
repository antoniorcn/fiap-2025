import axios from 'axios';
import { Contato, ContatoErro } from '../model/contato';

interface salvarCallback { 
    (sucesso : boolean, erro : string, 
        contatoCamposErro? : ContatoErro) : void
}

const contatoApiSave = (contato : Contato, 
    onFinalizar : salvarCallback) => {    
    console.log("contatoApiSave(): acionado");
    axios.post(
        "https://tdspv-a8c0e-default-rtdb.firebaseio.com/contato.json",
        contato
    )
    .then(()=>{
        onFinalizar(true, "", {});
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro);
    })
}

export {contatoApiSave, salvarCallback};