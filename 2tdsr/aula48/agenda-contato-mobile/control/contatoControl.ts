import {useEffect, useState, useContext} from 'react';
import { Contato, ContatoErros } from '../model/contato';
import { apagarContato, atualizarContato, carregarContatos, salvarContato,
    enviarImagemContato
 } from '../service/contatoService';
import { CallBackApagar, CallBackAtualizar, CallBackCarregar, CallBackSalvar } from '../fetcher/contatoFetcher';
import { ContextoPrincipal } from '../contexto/contextoPrincipal';
import { launchImageLibraryAsync, MediaLibraryPermissionResponse, 
    requestMediaLibraryPermissionsAsync, ImagePickerOptions, 
    ImagePickerResult,
    ImagePickerAsset} from 'expo-image-picker';

const contatoLimpo : Contato = {
        id: undefined, nome: "", telefone: "", email : ""
    };

const useContatoControl = ( navigation : any ) => { 

    const {token} = useContext(ContextoPrincipal);

    const [contato, setContato] = useState<Contato>(contatoLimpo);
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [contatoErro, setContatoErro] = useState<any>({});
    const [photo, setPhoto] = useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string>("");
    const [status, setStatus] = useState<string>("sucesso");

    useEffect ( ()=> { carregar();}, []);

    const callback : CallBackSalvar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato gravado com sucesso");
            setStatus("sucesso");
            setContato(contatoLimpo);
            carregar();
        } else { 
            setMensagem(texto);
            setStatus("erro")
            if (erros) {
                setContatoErro(erros);
            }
        }
        setLoading(false);
    }

    const callbackAtualizar : CallBackAtualizar = 
    (sucesso : boolean, texto : string, erros? : ContatoErros ) => { 
        if (sucesso) { 
            setMensagem("Contato atualizado com sucesso");
            setStatus("sucesso");
            setContato(contatoLimpo);
            carregar();
            navigation.navigate("Listagem");
        } else { 
            setMensagem(texto);
            setStatus("erro")
            if (erros) {
                setContatoErro(erros);
            }
        }
        setLoading(false);
    }

    const salvar = () => {
        setLoading(true);
        setContatoErro({});
        if (contato.id) { 
            atualizarContato(contato.id, contato, callbackAtualizar, token??"");
        } else { 
            salvarContato(contato, callback, token??"");
        }
    }

    const callbackApagar : CallBackApagar = 
    (sucesso : boolean, texto : string) => { 
        if (sucesso) { 
            setMensagem("Contato apagado com sucesso");
            setStatus("sucesso");
            carregar();
        } else { 
            setMensagem(texto);
            setStatus("erro")
        }
        setLoading(false);
    }

    const apagar = (id : number) => {
        setLoading(true);
        setContatoErro({});
        apagarContato(id, callbackApagar, token??"");
    }

    const atualizar = (id : number) => {
        const contatosSelecionados = contatoLista
                            .filter( (c : Contato) => c.id == id )
        if (contatosSelecionados.length > 0) { 
            setContato(contatosSelecionados[0]);
            navigation.navigate("Formulario");
        }
    }

    const callbackCarregar : CallBackCarregar = 
    (sucesso : boolean, texto : string, lista : Contato[] ) => { 
        if (sucesso) { 
            setStatus("sucesso")
            setMensagem(`Foram carregados ${lista.length} contatos`);
            setContatoLista( lista );
        } else { 
            setStatus("erro")
            setMensagem(texto);
        }
        setLoading(false);
    }

    const carregar = () => {
        setLoading(true);
        setContatoErro({});
        carregarContatos(callbackCarregar, token??"");
    }

    const handlerInput = (texto: string, nomeCampo : string) => {
        const novoContato = {...contato};
        if (nomeCampo !== "id") { 
            novoContato[nomeCampo as keyof typeof novoContato] = texto;    
            setContato( novoContato );
        }
    }

    const carregarImageMediaLibrary = async () => {
        try { 
            const permission : MediaLibraryPermissionResponse = await requestMediaLibraryPermissionsAsync();
            if (permission.granted) { 
                const opcoes : ImagePickerOptions = {
                    allowsEditing : false,
                    base64 : false,
                    mediaTypes : "images",
                    quality : 0.7,
                    allowsMultipleSelection : false
                }
                const result : ImagePickerResult = await launchImageLibraryAsync( opcoes );
                if (!result.canceled ) { 
                    if (!!result.assets && result.assets.length > 0) { 
                        const imagem : ImagePickerAsset = result.assets[0];
                        console.log("Imagem ==> ", imagem.uri);
                        setPhoto( imagem.uri!! );
                        const respostaSevice = await enviarImagemContato( 1, imagem );
                    }
                }
            }
        } catch ( erro : any ) { 
            console.error( erro.message );
            console.error( erro.stack );
        }
    }

    return {
        contato, contatoLista, 
        handlerInput, salvar, carregar, apagar, atualizar,
        carregarImageMediaLibrary,
        loading, mensagem, contatoErro, status, photo
    } 
}

export {useContatoControl};