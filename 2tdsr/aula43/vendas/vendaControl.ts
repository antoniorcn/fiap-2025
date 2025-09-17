import { Alert } from "react-native"
import { gravarVenda } from "./vendaService"
import { useState } from "react";


const VendasCallBack = ( status : boolean, erro? : string ) : void => { 
    if ( status ) { 
        Alert.alert(" Venda gravada com sucesso ");
    } else { 
        Alert.alert(" Erro ao gravar a venda ");
    }
}


const useVendaControl = () => {

    const [id, setId] = useState<number | null>(null);
    const [titulo, setTitulo] = useState<string>("");
    const [preco, setPreco] = useState<string>("");

    const gravarVendaControl = () => { 

        // Gravar venda sem call back
        // gravarVenda( {id: 0, titulo, preco: parseFloat(preco)})
        // .then( ()=> {
        //     Alert.alert("Venda foi gravada com sucesso");
        // } ) 
        // .catch( () => {
        //     Alert.alert("Erro ao gravar a venda");
        // } )
        // console.log("Venda acionada para ser gravada na API");

        // Gravar Venda com Callback
        gravarVenda( {id: 0, titulo, preco: parseFloat(preco)}, 
            VendasCallBack
         );
    }

    return { id, setId, titulo, setTitulo, preco, setPreco,
        gravarVendaControl }

} 

export { useVendaControl }