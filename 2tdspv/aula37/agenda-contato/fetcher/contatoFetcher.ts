import axios, { AxiosResponse } from 'axios';
import { Contato, ContatoErro } from '../model/contato';

interface SalvarCallback { 
    (sucesso : boolean, erro : string, 
        contatoCamposErro? : ContatoErro) : void
}


interface CarregarCallback { 
    (sucesso : boolean, erro : string, 
        listaContatos : Array<Contato>) : void
}

const contatoApiSave = (contato : Contato, 
    onFinalizar : SalvarCallback) => {    
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

const contatoApiLoad = (onFinalizar : CarregarCallback) => {    
    console.log("contatoApiLoad(): acionado");
    axios.get(
        "https://tdspv-a8c0e-default-rtdb.firebaseio.com/contato.json"
    )
    .then(( response : AxiosResponse<any, any>)=>{
        const lista : Contato[] = [];
        for( const chave in response.data) {
            const contato = response.data[chave as keyof Contato];
            lista.push( contato );
        }
        onFinalizar(true, "", lista);
    })
    .catch((erro : string)=>{
        onFinalizar(false, erro, []);
    })
}

export {contatoApiSave, contatoApiLoad, SalvarCallback, CarregarCallback};