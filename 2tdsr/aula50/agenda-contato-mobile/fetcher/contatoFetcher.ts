import { ImagePickerAsset } from 'expo-image-picker';
import { Contato } from '../model/contato';
import axios, {AxiosResponse} from 'axios';
import { Platform } from 'react-native';
import { serverURL } from './config';

const apiContato = axios.create({ 
    baseURL: serverURL
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

interface CallbackUpload {
    (success: boolean, message: string, imageUrl?: string): void;
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

// const enviarImagemApi = (contatoId : number, imagem : ImagePickerAsset,
//     callback : CallbackUpload, token? : string ) => {
//         console.log("enviarImagemApi(): acionado");
//         const tempListaImgType = imagem.type?.split("/");
//         const size = tempListaImgType?.length ? tempListaImgType?.length : 0;
//         const tipo = tempListaImgType && size > 1 ? tempListaImgType[1] : "jpeg";
//         const formData = new FormData();
//         formData.append("imagem", {
//             uri: imagem.uri,
//             type: `image/${tipo}`,
//             name: imagem.fileName || `image_${contatoId}.${tipo}`
//         } as any);
//         const urlPost = `/imagem?contato_id=${contatoId}&tipo=${tipo}`;
// //         console.log("URL Post ==> ", urlPost);
//         apiContato.post(urlPost, formData, {headers: {
//                 Authorization: `Bearer ${token}` // Or 'Basic YOUR_BASIC_AUTH_STRING'
//                 }})
//         .then(()=>{
//             callback(true, "");
//         })
//         .catch((erro : string)=>{
//             callback(false, erro)
//         });
//     }

const enviarImagemApi = async (contatoId : number, imagem : ImagePickerAsset,
    callback : CallbackUpload, token? : string 
 ) : 
    Promise<boolean> => {
    try {       
        const tempListaImgType = imagem.type?.split("/");
        const size = tempListaImgType?.length ? tempListaImgType?.length : 0;
        const tipo = tempListaImgType && size > 1 ? tempListaImgType[1] : "jpeg";
        
        // Criar FormData corretamente para React Native
        const formData = new FormData();
        
        // Normalizar content-type: alguns devices retornam apenas "image"
        const normalizedType = `image/${tipo}`;

        // Adicionar imagem ao FormData - formato correto para React Native
        formData.append("imagem", {
            uri: imagem.uri,
            type: normalizedType,
            name: imagem.fileName || `image_${contatoId}.${tipo}`
        } as any);
        
        console.log("FormData criado com sucesso");
        console.log("Tipo da imagem:", imagem.type);
        console.log("Nome do arquivo:", imagem.fileName);
        console.log("URI:", imagem.uri);
        
        // Configuração do axios: NÃO definir Content-Type para permitir boundary automático
        // const config = {
        //     headers: {
        //         // 'Content-Type': 'multipart/form-data',
        //         Authorization: `Bearer ${token}`
        //     },
        //     // timeout: 30000,
        // };
        
        // const urlPost = `/imagem?contato_id=${contatoId}&tipo=${tipo}`;
        const urlPost = `${serverURL}/imagem?contato_id=${contatoId}&tipo=${tipo}`;
        console.log("URL Post 2==> ", urlPost);
        
        // const result = await apiContato.post("/imagem", formData, config);
        const result = await fetch(urlPost, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: formData
        });
        const data = await result.json();
        console.log("Upload realizado com sucesso!", data);
        callback(true, "Imagem enviada com sucesso");
        return true;
        
    } catch ( error : any ) { 
        console.log("Erro Message ==> ", error.message);
        console.log("Erro ==> ", JSON.stringify(error));
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
        callback(false, error.message);
        return false;
    }
}


export {salvarApi, carregarApi, apagarApi, atualizarApi, enviarImagemApi,
    CallBackSalvar, CallBackCarregar, CallBackApagar, CallBackAtualizar, CallbackUpload};