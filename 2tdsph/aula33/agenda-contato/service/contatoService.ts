import { Contato } from "../model/Contato";
import { contatoFetcherSalvar, SalvarCallback } from "../fetcher/contatoFetcher";
// import { AxiosResponse } from 'axios';

// const contatoServicoSalvar = ( contato : Contato ) : 
//     Promise<AxiosResponse<any, any>> => {
//     return contatoFetcherSalvar( contato );
// }

const contatoServicoSalvar = 
    ( contato : Contato, callback : SalvarCallback ) : void => {
        contatoFetcherSalvar( contato, callback );
}

export {contatoServicoSalvar};