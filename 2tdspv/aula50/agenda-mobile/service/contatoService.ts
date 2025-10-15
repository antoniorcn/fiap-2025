import { ApagarCallback, AtualizarCallback, CarregarCallback, contatoApiDelete, contatoApiLoad, contatoApiSave, contatoApiUpdate, SalvarCallback } from '../fetcher/contatoFetcher';
import { Contato, ContatoErro, contatoSchema } from '../model/contato';
import { ValidationError } from 'yup';

const contatoServiceSave = (contato : Contato, 
        onFinalizar : SalvarCallback, token? : string) => { 
    console.log("contatoServiceSave(): acionado");
    contatoSchema.validate(contato, {abortEarly: false})
    .then(()=>{
        contatoApiSave(contato, onFinalizar, token);
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

const contatoServiceLoad = (onFinalizar : CarregarCallback, token? : string) => { 
     contatoApiLoad(onFinalizar, token);
}

const contatoServiceDelete = (id : string, onFinalizar : ApagarCallback, token? : string ) => { 
    contatoApiDelete(id, onFinalizar, token);
}

const contatoServiceUpdate = (id : string, contato : Contato,
    onFinalizar : AtualizarCallback, token? : string) => { 
    contatoSchema.validate(contato, {abortEarly: false})
    .then(()=>{
        contatoApiUpdate(id, contato, onFinalizar, token)
    })
    .catch(( erros : ValidationError )=>{
        const errosContato : ContatoErro = {};
        erros.inner.forEach((erroCampo : ValidationError)=>{
            const chave = erroCampo.path // "email" | "nome" | "telefone"
            errosContato[chave as keyof typeof errosContato] = erroCampo.message
        })
        onFinalizar(false, erros.message, errosContato);
    })
}

export {contatoServiceSave, contatoServiceLoad, 
    contatoServiceDelete, contatoServiceUpdate};