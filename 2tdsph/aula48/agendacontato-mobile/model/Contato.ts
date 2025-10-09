import {object, string, ObjectSchema, InferType} from 'yup';

interface ContatoErro { 
    nome? : string
    telefone? : string
    email? : string
}

const contatoSchema : ObjectSchema<any, any> = object({
    id : string().nullable().default(null),
    nome : string()
        .required("Por favor preencha o nome"),
    email : string()
        .required("Por favor preencha o email")
        .email("Informe um email válido"),
    telefone : string()
        .required("Por favor preencha o telefone")
        .min(8, "Informe um numero de telefone válido")
})

type Contato = InferType<typeof contatoSchema>;

export { Contato, ContatoErro, contatoSchema }