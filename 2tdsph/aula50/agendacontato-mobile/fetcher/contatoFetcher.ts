import { ImagePickerAsset, requestCameraPermissionsAsync,
    CameraPermissionResponse, launchCameraAsync,
    ImagePickerOptions, 
    CameraType} from "expo-image-picker";
import { Platform } from "react-native";
import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ImageInfo } from "../model/ImageInfo";
import { serverURL } from "./config";
const apiBase = axios.create({
    baseURL: serverURL
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
    (sucesso : boolean, mensagem : string, imagemUri : string | null) : void;
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

const contatoFetcherImageUpload = async ( asset : ImagePickerAsset, imgInfo : ImageInfo, 
        callback : ImageUploadCallback, token? : string ) : Promise<void> => { 
    console.log("Asset ==> ", asset); 
    console.log("<<< Enviando imagem via ", Platform.OS, " >>>");
    const fileName = imgInfo.nomeAquivo ?? "photo." + imgInfo.tipo;
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: asset.uri,
            type: `image/${imgInfo.tipo}`,
            name: fileName
        } as any);
        
        const caminho = `${serverURL}/contato/image?contato_id=${imgInfo.id}&tipo=${imgInfo.tipo}`;
        console.log("Caminho ==> ", caminho);
        const resultado = await fetch(caminho, {
            headers: {
               //  "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            method : "POST",
            body: formData
        });
        const resposta = await resultado.json();


        // const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
        // const resposta = await apiBase.post(
        //     `/contato/image?contato_id=1&tipo=${imgInfo.tipo}`,
        //     formData, config );

        // console.log("Resposta ==> ", JSON.stringify(resposta));
        callback(true, "Imagem enviada com sucesso", asset.uri);
    } catch (erro : any) {
        console.log("Erro no upload ==> ", erro);
        console.log("Erro completo:", JSON.stringify(erro, null, 2));
        callback(false, erro.message || "Erro de rede", null);
    }
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
    contatoFetcherImageUpload,
    SalvarCallback, LerCallback, ApagarCallback, AtualizarCallback, ImageUploadCallback}; 