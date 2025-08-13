import axios from 'axios';
import { Contato } from '../model/contato';
// const contatoApiSave = ( nome : string, 
//     telefone : string, email : string) => {
const contatoApiSave = ( contato : Contato) => {    
    console.log("contatoApiSave(): acionado");
    axios.post("https://tdspv-a8c0e-default-rtdb.firebaseio.com/contato.json",
        // {nome, telefone, email}
        contato
    );
}

export {contatoApiSave};