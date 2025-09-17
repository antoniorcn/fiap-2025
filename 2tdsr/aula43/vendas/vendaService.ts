import { Venda } from "./venda";
import { VendaCallBackType } from "./vendaFetcher";
import { gravarVendaAPI } from "./vendaFetcher";


// Versão sem callback
// const gravarVenda = async ( venda : Venda ) : Promise<boolean> => {
//     try { 
//         await gravarVendaAPI( venda );
//         return true;
//     } catch (erro : any ) { 
//         return false;
//     }
//     console.log("Venda gravada");
// }


// Versão com callback (Async Await), 
//     callback : VendaCallBackType
// ) => {
//     try { 
//         await gravarVendaAPI( venda );
//         callback( true, "");
//     } catch (erro : any ) { 
//         callback( false, erro??"" );
//     }
//     console.log("Venda gravada");
// }

// Versão com callback (Sem Async Await)
const gravarVenda = async ( venda : Venda, 
    callback : VendaCallBackType
) => {
    gravarVendaAPI( venda )
    .then( () => {
        callback( true, "");
    })
    .catch (( erro : any )=> {
        callback( false, erro??"" );
    })
    console.log("Venda gravada");
}

export { gravarVenda };