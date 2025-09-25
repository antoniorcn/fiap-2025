import { Contato } from '../model/contato';
import axios, {AxiosResponse} from 'axios';

const apiContato = axios.create({ 
    baseURL: "http://10.70.2.152:8080"
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

const salvarApi = ( contato : Contato, callback : CallBackSalvar, token? : string ) => {
    console.log("salvarApi(): acionado");
    apiContato.post("/contato", 
        contato, {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const apagarApi = ( id : string, callback : CallBackApagar, token? : string ) => {
    console.log("salvarApi(): acionado");
    apiContato.delete(`/contato/${id}.json`, {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const atualizarApi = ( id : string, contato : Contato, 
        callback : CallBackAtualizar, token? : string ) => {
    console.log("atualizarApi(): acionado");
    apiContato.put(`/contato/${id}.json`, contato, {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const carregarApi = ( callback : CallBackCarregar, token? : string ) => {
    console.log("carregarApi(): acionado");
    apiContato.get("/contato.json", {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
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