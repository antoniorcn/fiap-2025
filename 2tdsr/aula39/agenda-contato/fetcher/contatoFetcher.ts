import { Contato } from '../model/contato';
import axios, {AxiosResponse} from 'axios';

interface CallBackSalvar {
    (sucesso : boolean, mesagem : string, erros? : object ) : void
}

interface CallBackCarregar {
    (sucesso : boolean, mesagem : string, lista : Contato[] ) : void
}

const salvarApi = ( contato : Contato, callback : CallBackSalvar ) => {
    console.log("salvarApi(): acionado");
    axios.post("https://tdsr-329ac-default-rtdb.firebaseio.com/contato.json", 
        contato)
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const carregarApi = ( callback : CallBackCarregar ) => {
    console.log("carregarApi(): acionado");
    axios.get("https://tdsr-329ac-default-rtdb.firebaseio.com/contato.json")
    .then(( response : AxiosResponse<any, any>) => {
        const lista : Contato[] = [];
        for (const chave in response.data) {
            const obj : Contato = response.data[chave as keyof Contato];
            obj.id = chave;
            lista.push( obj );
        }
        callback(true, "", lista);
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}


export {salvarApi, carregarApi, CallBackSalvar, CallBackCarregar};