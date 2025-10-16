import { AnyObject, InferType, object, ObjectSchema, string, number } from 'yup';


const telefoneRegex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3,4}-[0-9]{4}$/

const contatoSchema = object({
    id : number().nullable(),
    nome : string()
            .trim()
            .required("O nome é obrigatório")
            .min(6, "O nome deve ter ao menos 6 caracteres"),
    email : string()
            .trim()
            .required("O email é obrigatório")
            .email("É preciso digitar um email válido"),
    telefone: string()
            .trim()
            .required()
            // .matches(telefoneRegex, "É preciso digitar um telefone válido")
            .min(10, "O telefone deve ter ao menos 10 algarismos")
            
})

type Contato = InferType<typeof contatoSchema>

type ContatoErros = { 
    nome? : string,
    telefone? : string,
    email? : string
}

export {Contato, ContatoErros, contatoSchema}