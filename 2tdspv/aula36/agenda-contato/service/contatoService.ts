import { AxiosResponse } from 'axios';
import { contatoApiSave, salvarCallback } from '../fetcher/contatoFetcher';
import { Contato, ContatoErro, contatoSchema } from '../model/contato';
import { ValidationError } from 'yup';

const contatoServiceSave = (contato : Contato, 
        onFinalizar : salvarCallback) => { 
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
            // {"email": "Email é obrigatorio", "telefone": "Telefone é obrigatorio"} 
            // if (chave) {
            //     errosContato[chave] = erroCampo.message
            // }
        })
        console.log("Erros Contato: ", errosContato);
        onFinalizar(false, erros.message, errosContato);
    })
    console.log("contatoServiceSave(): executado")
    // try { 
    //     await contatoSchema.validate(contato)
    //     await contatoApiSave(contato, onFinalizar)
    // } catch (e) { 

    // }
    
}

export {contatoServiceSave};