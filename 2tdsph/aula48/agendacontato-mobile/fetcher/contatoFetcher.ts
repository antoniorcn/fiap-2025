import { ImagePickerAsset } from "expo-image-picker";
import { Contato, ContatoErro } from "../model/Contato";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ImageInfo } from "../model/ImageInfo";
const apiBase = axios.create({
    baseURL: "http://localhost:8080"
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
    .catch(( erro : any)=>callback(false, erro))
}


const contatoFetcherApagar =
 (id : string, callback : ApagarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.delete( `/contato/${id}`, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
}

const contatoFetecherImageUpload = ( asset : ImagePickerAsset, imgInfo : ImageInfo, 
        callback : ImageUploadCallback ) : void => { 

    
    const fileName = asset.fileName ?? "photo.png";
    const parts = asset.uri.split(';base64,');
    const contentType = parts[0].split(':')[1];
    console.log("Image parts ==> ", parts);
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    console.log("Content-Type: ", imgInfo.tipo);
    console.log("File Name ==>: ", fileName);

    const blob = new Blob([uInt8Array], { type: imgInfo.tipo });
    console.log("Blob gerado: ", blob);

    const jsonBlob = new Blob([JSON.stringify(imgInfo)], { type: "application/json" });

    const formData = new FormData();
    // const imageType = asset.mimeType??"image/png";
    formData.append("image", blob, fileName );
    formData.append("imageInfo", jsonBlob);
    console.log("FormData==>", formData );
    // apiBase.post("/images", formData, {	
    //     onUploadProgress: (e) => {
    //         if (e.total) 
    //             console.log(Math.round((e.loaded * 100) / e.total));
    //     }
    // })
    fetch("http://localhost:8080/images", {
        method: "POST",
        body: formData,
    })
    .then(()=>callback(true, ""))
    .catch(( erro : any )=>callback(false, erro.message));
    //{ 
    //    uri : asset.uri,
    //    name : imgInfo.nomeAquivo,
    //    type : asset.mimeType ?? "image/png",
    //}
}

const contatoFetcherAtualizar =
 (id : string, contato : Contato, callback : AtualizarCallback, token? : string  ) : void => {
    const config : AxiosRequestConfig = {headers: {"Authorization": `Bearer ${token}`}};
    console.log("Headers: ", config);
    apiBase.put( `/contato/${id}`, contato, config )
    .then(()=>callback(true, ""))
    .catch(( erro : any)=>callback(false, erro))
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
    .catch((erro : any)=>callback(false, erro))
}

export {contatoFetcherSalvar, contatoFetcherLer, 
    contatoFetcherApagar, contatoFetcherAtualizar,
    contatoFetecherImageUpload,
    SalvarCallback, LerCallback, ApagarCallback, AtualizarCallback, ImageUploadCallback}; 