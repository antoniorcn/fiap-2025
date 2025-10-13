import { ImagePickerAsset, requestCameraPermissionsAsync,
    CameraPermissionResponse, launchCameraAsync,
    ImagePickerOptions, 
    CameraType} from "expo-image-picker";
import { Platform } from "react-native";
import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ImageInfo } from "../model/ImageInfo";
const apiBase = axios.create({
    baseURL: "http://10.70.2.52:8080"
});

interface SalvarCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

interface LerCallback { 
    (sucesso : boolean, mensagem : string, lista? : Array<Contato>) : void;
}

interface ApagarCallback { 
    (sucesso : boolean, mensagem : string) : void;
}

interface AtualizarCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

interface ImageUploadCallback { 
    (sucesso : boolean, mensagem : string, errosCampos? : ContatoErro) : void;
}

const contatoFetcherSalvar =
 (contato : Contato, callback : SalvarCallback, token? : string ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.post( "/contato", contato, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro.message))
}


const contatoFetcherApagar =
 (id : string, callback : ApagarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.delete( `/contato/${id}`, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro.message))
}

const contatoFetecherImageUpload = ( asset : ImagePickerAsset, imgInfo : ImageInfo, 
        callback : ImageUploadCallback ) : void => { 
    console.log("Asset ==> ", asset);
    const fileName = asset.fileName ?? "photo.png";
    const formData = new FormData();
    
    console.log("<<< Enviando imagem via ", Platform.OS, " >>>");
    
    // Preparar dados da imagem para ambas as plataformas
    const assetData : any = {
        uri: asset.uri,
        type: asset.type ?? "image/jpeg",
        name: fileName
    };
    
    // Adicionar imagem ao FormData
    formData.append("image", assetData);
    
    // Adicionar imageInfo como Blob JSON (necessário para @RequestPart)
    const jsonBlob = new Blob([JSON.stringify(imgInfo)], { type: "application/json" });
    formData.append("imageInfo", jsonBlob);
    
    console.log("FormData==>", formData);
    
    // Configuração do axios com headers corretos
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
        onUploadProgress: (progressEvent: any) => {
            if (progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${progress}%`);
            }
        }
    };
    
    apiBase.post("/images", formData, config)
        .then(() => {
            console.log("Upload realizado com sucesso!");
            callback(true, "");
        })
        .catch((erro: any) => {
            console.log("Erro no upload ==> ", erro);
            console.log("Response data:", erro.response?.data);
            console.log("Response status:", erro.response?.status);
            callback(false, erro.message || erro.response?.data?.message || "Erro desconhecido");
        });
}

const contatoFetcherAtualizar =
 (id : string, contato : Contato, callback : AtualizarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.put( `/contato/${id}`, contato, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro.message))
}

const contatoFetcherLer = (callback : LerCallback, token? : string ) : void => { 
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.get("/contato", config)
    .then(( resposta : AxiosResponse<any, any>)=>{
        const listaContatos = [];
        for ( const objContato of resposta.data ){  
            listaContatos.push( objContato );
        }
        callback(true, `Foram lidos ${listaContatos.length} contatos`, listaContatos);
    })
    .catch((erro : any)=>callback(false, erro.message))
}

export {contatoFetcherSalvar, contatoFetcherLer, 
    contatoFetcherApagar, contatoFetcherAtualizar,
    contatoFetecherImageUpload,
    SalvarCallback, LerCallback, ApagarCallback, AtualizarCallback, ImageUploadCallback}; 