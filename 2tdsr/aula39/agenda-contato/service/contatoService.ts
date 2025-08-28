import { ValidationError } from 'yup';
import { CallBackCarregar, CallBackSalvar, carregarApi, salvarApi } from '../fetcher/contatoFetcher';
import { Contato, ContatoErros, contatoSchema } from '../model/contato';

const salvarContato = ( contato : Contato, callback : CallBackSalvar ) => {
    console.log("servico:salvarContato() - acionado");
    contatoSchema.validate( contato, {abortEarly : false} )
    .then(()=>{
        salvarApi(contato, callback)
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

const carregarContatos = (carregarCallBack : CallBackCarregar) => { 
    carregarApi( carregarCallBack );
}

export {salvarContato, carregarContatos};