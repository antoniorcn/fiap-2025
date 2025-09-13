import {InferType, object, string} from "yup";

const usuarioSchema = object({
    email: string().required().email(),
    senha: string().required().min(5)
});

type Usuario = InferType<typeof usuarioSchema>;

interface UsuarioErros { 
    email? : string
    senha? : string
}

export { usuarioSchema, Usuario, UsuarioErros }