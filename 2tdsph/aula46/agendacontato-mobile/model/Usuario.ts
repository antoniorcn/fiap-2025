import { object, string, InferType } from 'yup';

const usuarioSchema = object({
    email : string().email("Informe um email valido"),
    senha : string().min(5, "A senha deve ter no minimo 5 caracteres")
});

interface UsuarioErro { 
    email? : string
    senha? : string
}

type Usuario = InferType<typeof usuarioSchema>

export {usuarioSchema, Usuario, UsuarioErro}