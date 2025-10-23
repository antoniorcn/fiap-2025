import { ValidationError } from 'yup';
import { apagarApi, atualizarApi, CallBackApagar, CallBackAtualizar, 
    CallBackCarregar, CallBackSalvar, carregarApi, salvarApi, enviarImagemApi, 
    CallbackUpload} from '../fetcher/contatoFetcher';
import { Contato, ContatoErros, contatoSchema } from '../model/contato';
import { ImagePickerAsset } from 'expo-image-picker';

const salvarContato = ( contato : Contato, callback : CallBackSalvar, token? : string ) => {
    console.log("servico:salvarContato() - acionado");
    contatoSchema.validate( contato, {abortEarly : false} )
    .then(()=>{
        salvarApi(contato, callback, token);
    })
    .catch(( error )=>{
        const errosFinais : ContatoErros = {}
        error.inner.forEach( (er : ValidationError) => {
            errosFinais[er.path as keyof typeof errosFinais] = 
                er.message
        });
        console.log("Erros Finais ==> ", errosFinais);

        callback(false, error.message, errosFinais)
    })
}


const atualizarContato = ( id : number, contato : Contato, 
    callback : CallBackAtualizar, token? : string  ) => {
    console.log("servico:atualizarContato() - acionado");
    contatoSchema.validate( contato, {abortEarly : false} )
    .then(()=>{
        atualizarApi(id, contato, callback, token)
    })
    .catch(( error )=>{
        const errosFinais : ContatoErros = {}
        error.inner.forEach( (er : ValidationError) => {
            errosFinais[er.path as keyof typeof errosFinais] = 
                er.message
        });
        console.log("Erros Finais ==> ", errosFinais);

        callback(false, error.message, errosFinais)
    })
}

const apagarContato = ( id: number, callback : CallBackApagar, token? : string  ) => {
    console.log("servico:apagarContato() - acionado");
    apagarApi(id, callback, token);
}

const carregarContatos = async (token? : string ) : Promise<Contato[]> => { 
    return await carregarApi( token );
}

const enviarImagemContato = (contatoId : number, imagem : ImagePickerAsset,
    callback : CallbackUpload, token? : string 
 ) : Promise<boolean> => { 
    return  enviarImagemApi( contatoId, imagem, callback, token );
}

export {salvarContato, carregarContatos, 
        apagarContato, atualizarContato, enviarImagemContato};