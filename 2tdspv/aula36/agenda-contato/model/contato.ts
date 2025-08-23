import { InferType, object, string } from 'yup';

const contatoSchema = object({
    nome: string()
            .required("O nome é obrigatório")
            .min(5, "O nome precisa ter 5 caracteres"),
    email: string()
            .required("O email é obrigatório")
            .email("O email deve ser preenchido com um email válido"),
    telefone: string()
            .required("O telefone é obrigatório")
            .min(10, "O telefone deve ter no mínimo 10 caracteres")
});

type Contato = InferType<typeof contatoSchema>

interface ContatoErro {
    nome? : string
    telefone? : string
    email? : string
} 

export {contatoSchema, Contato, ContatoErro};