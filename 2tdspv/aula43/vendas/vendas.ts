import {object, string, number, InferType} from 'yup';
// interface Venda { 
//     id? : number
//     titulo : string
//     preco : number
// }

const VendaSchema = object({
    id: number().nullable(),
    titulo : string().required().min(5),
    preco: number().required().moreThan(0)
});

type Venda = InferType<typeof VendaSchema>;


// type Venda = { 
//     id? : number,
//     titulo : string,
//     preco : number
// }

// const obj : Venda = { id: 0, titulo : " ", preco: 0.0 } 

export { Venda, VendaSchema };