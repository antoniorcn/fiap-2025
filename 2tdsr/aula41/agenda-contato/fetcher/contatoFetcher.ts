import { Contato } from '../model/contato';
import axios, {AxiosResponse} from 'axios';

const apiContato = axios.create({ 
    baseURL: "https://tdsr-329ac-default-rtdb.firebaseio.com"
});

interface CallBackSalvar {
    (sucesso: boolean, mesagem: string, erros?: object ) : void
}

interface CallBackCarregar {
    (sucesso: boolean, mesagem: string, lista: Contato[] ) : void
}

interface CallBackApagar {
    (sucesso: boolean, mesagem: string) : void
}

interface CallBackAtualizar {
    (sucesso: boolean, mesagem: string, erros?: object ) : void
}

const salvarApi = ( contato : Contato, callback : CallBackSalvar ) => {
    console.log("salvarApi(): acionado");
    apiContato.post("/contato.json", 
        contato)
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const apagarApi = ( id : string, callback : CallBackApagar ) => {
    console.log("salvarApi(): acionado");
    apiContato.delete(`/contato/${id}.json`)
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const atualizarApi = ( id : string, contato : Contato, 
        callback : CallBackAtualizar ) => {
    console.log("atualizarApi(): acionado");
    apiContato.put(`/contato/${id}.json`, contato)
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const carregarApi = ( callback : CallBackCarregar ) => {
    console.log("carregarApi(): acionado");
    apiContato.get("/contato.json")
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
        callback(false, erro, [])
    });
}


export {salvarApi, carregarApi, apagarApi, atualizarApi,
    CallBackSalvar, CallBackCarregar, CallBackApagar, CallBackAtualizar};