import { ImagePickerAsset } from 'expo-image-picker';
import { Contato } from '../model/contato';
import axios, {AxiosResponse} from 'axios';

const apiContato = axios.create({ 
    baseURL: "http://127.0.0.1:8080"
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

const apagarApi = ( id : number, callback : CallBackApagar, token? : string ) => {
    console.log("salvarApi(): acionado");
    apiContato.delete(`/contato/${id}`, {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
    .then(()=>{
        callback(true, "");
    })
    .catch((erro : string)=>{
        callback(false, erro)
    });
}

const atualizarApi = ( id : number, contato : Contato, 
        callback : CallBackAtualizar, token? : string ) => {
    console.log("atualizarApi(): acionado");
    apiContato.put(`/contato/${id}`, contato, {headers: {
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
    apiContato.get("/contato", {headers: {
                            Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
                            }})
    .then(( response : AxiosResponse<any, any>) => {
        callback(true, "", response.data);
    })
    .catch((erro : string)=>{
        callback(false, erro, [])
    });
}

const enviarImagemApi = async (contatoId : number, imagem : ImagePickerAsset ) : 
    Promise<boolean> => {     
    const formData = new FormData();
   
    // Preparar dados da imagem para ambas as plataformas
    const assetData : any = {
        uri: imagem.uri,
        type: imagem.type ?? "image/jpeg",
        name: imagem.fileName ?? "photo.jpg"
    };
    
    // Adicionar imagem ao FormData
    formData.append("imagem", assetData);
    console.log("FormData==>", formData);
    
    // Configuração do axios com headers corretos
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
    };
    
    apiContato.post("/imagem?contato_id=1&tipo=jpeg", formData, config)
        .then(() => {
            console.log("Upload realizado com sucesso!");
        })
        .catch((erro: any) => {
            console.log("Erro no upload ==> ", erro);
            console.log("Response data:", erro.response?.data);
            console.log("Response status:", erro.response?.status);
        });
    return true;
}


export {salvarApi, carregarApi, apagarApi, atualizarApi, enviarImagemApi,
    CallBackSalvar, CallBackCarregar, CallBackApagar, CallBackAtualizar};