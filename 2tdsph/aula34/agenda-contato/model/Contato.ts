import yup, {object, string} from 'yup';

// interface Contato { 
//     nome? : string
//     telefone? : string
//     email? : string
// }

const contatoSchema : yup.ObjectSchema<any, any> = object({
    nome : string().required("Por favor preencha o nome"),
    email : string().email("Informe um email válido"),
    telefone : string().min(8, "Informe um numero de telefone válido")
})

type Contato = yup.InferType<typeof contatoSchema>;

export { Contato, contatoSchema }