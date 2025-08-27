import { AxiosResponse } from 'axios';
import { CarregarCallback, contatoApiLoad, contatoApiSave, SalvarCallback } from '../fetcher/contatoFetcher';
import { Contato, ContatoErro, contatoSchema } from '../model/contato';
import { ValidationError } from 'yup';

const contatoServiceSave = (contato : Contato, 
        onFinalizar : SalvarCallback) => { 
    console.log("contatoServiceSave(): acionado");
    contatoSchema.validate(contato, {abortEarly: false})
    .then(()=>{
        contatoApiSave(contato, onFinalizar)
    })
    .catch(( erros : ValidationError )=>{
        const errosContato : ContatoErro = {};
        erros.inner.forEach((erroCampo : ValidationError)=>{
            const chave = erroCampo.path // "email" | "nome" | "telefone"
            errosContato[chave as keyof typeof errosContato] = erroCampo.message
        })
        console.log("Erros Contato: ", errosContato);
        onFinalizar(false, erros.message, errosContato);
    })
    console.log("contatoServiceSave(): executado")   
}

const contatoServiceLoad = (onFinalizar : CarregarCallback) => { 
     contatoApiLoad(onFinalizar);
}

export {contatoServiceSave, contatoServiceLoad};