import { ImagePickerAsset, requestCameraPermissionsAsync,
    CameraPermissionResponse, launchCameraAsync,
    ImagePickerOptions, 
    CameraType} from "expo-image-picker";
import { Platform } from "react-native";
import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
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

// Função para gerar request multipart manualmente com boundary fixo
const generateManualMultipartRequest = async (asset: ImagePickerAsset, imgInfo: ImageInfo): Promise<Uint8Array> => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const fileName = asset.fileName ?? "photo.png";
    const mimeType = asset.mimeType ?? "image/jpeg";
    
    // 1. Ler o arquivo da imagem como ArrayBuffer
    const response = await fetch(asset.uri);
    const imageBuffer = await response.arrayBuffer();
    const imageData = new Uint8Array(imageBuffer);
    
    // 2. Preparar as partes do multipart
    const imageInfoJson = JSON.stringify(imgInfo);
    const imageInfoHeader = `Content-Disposition: form-data; name="imageInfo"\r\nContent-Type: application/json\r\n\r\n${imageInfoJson}\r\n`;
    const imageHeader = `Content-Disposition: form-data; name="image"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
    
    // 3. Criar buffers para cada parte
    const boundaryBytes = new TextEncoder().encode(`--${boundary}\r\n`);
    const endBoundaryBytes = new TextEncoder().encode(`--${boundary}--\r\n`);
    const imageInfoHeaderBytes = new TextEncoder().encode(imageInfoHeader);
    const imageHeaderBytes = new TextEncoder().encode(imageHeader);
    const newlineBytes = new TextEncoder().encode('\r\n');
    
    // 4. Calcular tamanho total e criar buffer final
    const totalSize = boundaryBytes.length + imageInfoHeaderBytes.length + 
                     boundaryBytes.length + imageHeaderBytes.length + 
                     imageData.length + newlineBytes.length + endBoundaryBytes.length;
    
    const finalBuffer = new Uint8Array(totalSize);
    let offset = 0;
    
    // 5. Montar o request multipart
    finalBuffer.set(boundaryBytes, offset);
    offset += boundaryBytes.length;
    finalBuffer.set(imageInfoHeaderBytes, offset);
    offset += imageInfoHeaderBytes.length;
    finalBuffer.set(boundaryBytes, offset);
    offset += boundaryBytes.length;
    finalBuffer.set(imageHeaderBytes, offset);
    offset += imageHeaderBytes.length;
    finalBuffer.set(imageData, offset);
    offset += imageData.length;
    finalBuffer.set(newlineBytes, offset);
    offset += newlineBytes.length;
    finalBuffer.set(endBoundaryBytes, offset);
    
    console.log("Request multipart gerado manualmente com boundary:", boundary);
    console.log("Tamanho total:", totalSize, "bytes");
    
    return finalBuffer;
};

const contatoFetcherImageUpload = async ( asset : ImagePickerAsset, imgInfo : ImageInfo, 
        callback : ImageUploadCallback ) : Promise<void> => { 
    console.log("Asset ==> ", asset);
    const fileName = asset.fileName ?? "photo.png";
    
    console.log("<<< Enviando imagem via ", Platform.OS, " >>>");
    try {
        // Opção 1: Usando FormData (mais simples e recomendado)
        const formData = new FormData();
        
        // Adicionar informações da imagem como JSON
        const imageInfoBlob = new Blob([JSON.stringify(imgInfo)], { 
            type: 'application/json' 
        });
        formData.append('imageInfo', imageInfoBlob);
        
        formData.append('image', {
            uri: asset.uri,
            type: asset.mimeType ?? "image/jpeg",
            name: fileName
        });
        
        // Opção 2: Request multipart manual com boundary fixo (descomente para usar)
        
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
        const multipartBuffer = await generateManualMultipartRequest(asset, imgInfo);
        
        const response = await apiBase.post("/images", multipartBuffer, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': multipartBuffer.length.toString(),
            },
        });
        
        
        // Usando FormData (opção 1)
        // const response : AxiosResponse<any, any> = await apiBase.post("/images", formData);

        // console.log("Upload response:", response);
        // callback(true, "");
    } catch (erro : any) {
        console.log("Erro no upload ==> ", erro);
        console.log("Erro completo:", JSON.stringify(erro, null, 2));
        callback(false, erro.message || "Erro de rede");
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