import {useContext, useEffect, useState} from 'react';
import {contatoServiceDelete, contatoServiceLoad, contatoServiceSave, contatoServiceUpdate} from '../service/contatoService';
import {ApagarCallback, AtualizarCallback, CarregarCallback, SalvarCallback} from '../fetcher/contatoFetcher';
import { Contato, ContatoErro } from '../model/contato';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProps } from '../navigation/navigationDefinition';
import { VaiContexto } from '../contexto/vaicontexto';
import { CameraType, ImagePickerAsset, ImagePickerOptions, ImagePickerResult, launchImageLibraryAsync, MediaLibraryPermissionResponse, requestMediaLibraryPermissionsAsync } from 'expo-image-picker';
import { useQuery } from '@tanstack/react-query';

const contatoLimpo : Contato = 
    {id: undefined, nome: "", telefone: "", email: ""};

const useContatoControl = () => { 

    const navigation = useNavigation<RootScreenNavigationProps>();

    const [contato, setContato] = useState<Contato>(contatoLimpo);
    const [contatoErro, setContatoErro] = useState<ContatoErro>(
        {}
    );
    const [mensagem, setMensagem] = useState<string>("");

    const [imagem, setImagem] = useState<string | null>( null );

    const {token} = useContext( VaiContexto );

    const queryContatos = useQuery({
        queryKey: ["contatos"],
        queryFn: () => carregar()
    })

    const handleInput = (valor : string, nomeCampo : string) => {
        const obj = {...contato};
        obj[nomeCampo as keyof typeof obj] = valor;
        setContato( obj );
    }

    const salvar = () => {
        const finalizar : SalvarCallback = 
            (resultadoSucesso : boolean, erro : string,
                contatoCamposErro? : ContatoErro
            ) => {
                if (resultadoSucesso) { 
                    setMensagem("Gravado com sucesso");
                    setContatoErro({});
                    setContato(contatoLimpo);
                    carregar();
                    navigation.navigate("Contato", { screen: "ContatoListagem" });
                } else { 
                    setMensagem("Erro: " + erro);
                    console.log(contatoCamposErro)
                    setContatoErro(contatoCamposErro??{})
                }
            }

        const finalizarUpdate : AtualizarCallback = 
            (resultadoSucesso : boolean, erro : string,
                contatoCamposErro? : ContatoErro
            ) => {
                if (resultadoSucesso) { 
                    setMensagem("Atualizado com sucesso");
                    setContatoErro({});
                    setContato(contatoLimpo);
                    carregar();
                    navigation.navigate("Contato", { screen: "ContatoListagem" });
                } else { 
                    setMensagem("Erro: " + erro);
                    console.log(contatoCamposErro)
                    setContatoErro(contatoCamposErro??{})
                }
            }            
        if (contato.id) { 
            contatoServiceUpdate(contato.id, contato, finalizarUpdate, token);
        } else { 
            contatoServiceSave(contato, finalizar, token);
        }
    }

    const carregar = async () : Promise<Contato[]> => {
        // const finalizarCarregamento : CarregarCallback = 
        // (resultadoSucesso : boolean, erro : string,
        //     lista : Array<Contato>
        // ) => {
        //     if (resultadoSucesso) { 
        //         setMensagem(`Foram lidos ${lista.length} contatos`);
        //         setSucesso(true);
        //         setContatoErro({});
        //         setContatoLista( lista );
        //     } else { 
        //         setMensagem("Erro: " + erro);
        //         setSucesso(false);
        //     }
        // }
        try { 
            const contatos = await contatoServiceLoad( token );
            return contatos;
            
        } catch ( error ) { 
            setMensagem("Erro: " + error);
            return [];
        }
    }

    const apagar = (id : string) => { 
        const finalizarApagar : ApagarCallback = 
        (success : boolean, erro : string) => { 
            if (success) { 
                setMensagem("Contato foi apagado com sucesso");
                carregar();
            } else { 
                setMensagem( erro );
            }
        }
        contatoServiceDelete(id, finalizarApagar, token);
    }

    const atualizar = ( id : string ) => {
        setContato(contatoLimpo);
        // contatoLista.forEach((contato : Contato)=> {
        //     if (contato.id === id) { 
        //         setContato( contato );
        //         navigation.navigate("Contato", { screen: "ContatoFormulario" });
        //     }
        // });
    }


    const carregarImageMidia = async () => { 
        
        const response : MediaLibraryPermissionResponse = await requestMediaLibraryPermissionsAsync();
        if (response.granted) { 
            const opcoes : ImagePickerOptions = { 
                mediaTypes : "images",
                base64: true,
                cameraType: CameraType.front,
                quality: 0.7
            };
            const imageResponse : ImagePickerResult = await launchImageLibraryAsync( opcoes );
            if (!imageResponse.canceled && 
                imageResponse.assets.length > 0) { 
                const img : ImagePickerAsset = imageResponse.assets[0];
                console.log( "Dados da Imagem: ", img );
                setImagem( img.uri );
            }
        }
    }

    return {contato, contatoLista: queryContatos.data, handleInput, 
        salvar, carregar, apagar, atualizar, carregarImageMidia,
        mensagem, contatoErro, imagem,
        sucesso : queryContatos.isSuccess, 
        loading: queryContatos.isLoading || queryContatos.isPending,};
}

export {useContatoControl};''