import { useState } from "react";
import { Contato, ContatoErro } from "../model/Contato";
import { contatoImageUpload, contatoServicoApagar, contatoServicoAtualizar, contatoServicoLer, contatoServicoSalvar } from "../service/contatoService";
import { ApagarCallback, AtualizarCallback, ImageUploadCallback, SalvarCallback } from "../fetcher/contatoFetcher";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { useProfileControl } from "./profileControl";
import { ImageInfo } from "../model/ImageInfo";
import { CameraPermissionResponse, CameraType, 
    ImagePickerOptions, launchCameraAsync, 
    ImagePickerResult,
    requestCameraPermissionsAsync, 
    launchImageLibraryAsync,
    requestMediaLibraryPermissionsAsync,
    MediaLibraryPermissionResponse} from "expo-image-picker";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

interface ContatoControlHook { 
    salvar : () => {};
    contato : Contato;
    setContato : ( contato : Contato ) => {};
    handleContato : (txt : string, campo : string) => {};
    mensagem : string;
}

const useContatoControl = () => { 
    const [contato, setContato] = useState<Contato>({});
    const [contatoErro, setContatoErro] = useState<ContatoErro>({});
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<boolean>(false);
    const [imagem, setImagem] = useState<string | null>(null);

    const query = useQuery({
        queryKey: ["contatos"],
        queryFn: () => contatoServicoLer( token )
    })

    const contatoSalvarMutation = useMutation({
        mutationFn: ()=>contatoServicoSalvar( contato, salvarCallback, token ),
        onSuccess: ()=> { 
            console.log("Sucesso ao gravar o contato");
            query.refetch();
        },
        onError: ( error : Error ) => { 
            console.log("Erro ao gravar o contato ==> ", error );
        }
    });

    const {token} = useProfileControl();

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCallback : SalvarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato gravado com sucesso");
            setContato( {id: null, nome: "", email: "", telefone: ""} );
            navigation.navigate("Contato", {screen: "ContatoLista"});
        } else { 
            setMensagem(msg);
            setContatoErro( errosCampos??{} );
        }
        setSucesso(success);
    }

    const atualizarCallback : AtualizarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato atualizado com sucesso");
            ler();
            navigation.navigate("Contato", {screen: "ContatoLista"});
        } else { 
            setMensagem(msg);
            setContatoErro( errosCampos??{} );
        }
        setSucesso(success);
    }

    // const lerCallback : LerCallback = 
    //     (success : boolean, msg : string, lista? : Array<Contato>) => {
    //     console.log("lerCallback() acionado");
    //     setSucesso(success);
    //     setMensagem(msg);
    //     if ( lista ) { 
    //         setContatoLista( lista );
    //         console.log("Lista de contatos ==> ", lista);
    //     }
    //     setLoading(false);
    // } 

    const apagarCallback : ApagarCallback = 
        (success : boolean, msg : string) => {
        console.log("apagarCallback() acionado");
        setSucesso(success);
        if (success) { 
            setMensagem("Contato apagado com sucesso");
        } else { 
            setMensagem(msg);
        }
    } 

    const imagemCallback : ImageUploadCallback = 
        (success : boolean, msg : string, imagemUri : string | null) => {
        console.log("imagemCallback() acionado");
        setSucesso(success);
        setImagem( null );
        if (success) { 
            setMensagem("Imagem encaminhada com sucesso");
            setImagem( imagemUri );
        } else {
            console.log("Mensagem: ",  msg );
            setMensagem(msg);
        }
    } 
    
    const salvar = () => {
        setContatoErro({});
        if (contato.id == null) {
            contatoSalvarMutation.mutate();
        } else { 
            contatoServicoAtualizar( contato.id, contato, atualizarCallback, token );
        }
        navigation.navigate("Contato", {screen: "ContatoLista"});
    }

    const ler = () => { 
        query.refetch();
    }

    const apagar = (id : string) => { 
        setContatoErro({});
        contatoServicoApagar( id, apagarCallback, token);
    }

    const atualizar = (id : string) => { 
        setContatoErro({});
        // const contatosFiltrados = contatoLista.filter( 
        //     (c : Contato)=> c.id == id
        // );
        // if (contatosFiltrados.length > 0) { 
        //     setContato( contatosFiltrados[0] );
        //     navigation.navigate("Contato", { screen: "ContatoFormulario"});
        // }
    }    

    const handleContato = (txt : string, campo : string) => { 
        const obj = {...contato};
        obj[campo as keyof typeof obj] = txt;
        setContato(obj);
    }

    const pegarFotoCamera = async () => {
        try { 
            const cameraPermission : CameraPermissionResponse = await requestCameraPermissionsAsync();
            if (cameraPermission.granted) {
                const options : ImagePickerOptions = { 
                    cameraType: CameraType.front ,
                    mediaTypes: "images",
                    quality: 0.4,
                    base64: false,
                    aspect: [1, 1]
                }
                const resposta : ImagePickerResult = await launchCameraAsync(options);
                if (!resposta.canceled) { 
                    if (resposta.assets.length > 0) { 
                        console.log("Foto tirada");
                        console.log( resposta.assets );
                        const imagem = resposta.assets[0];
                        const tipo = (imagem.mimeType?.startsWith("image/") ? 
                                            imagem.mimeType.split("/")[1] : imagem.mimeType)?? "jpg";
                        const imgInfo : ImageInfo = { 
                            id: 0,
                            nome: "Foto do contato",
                            descricao: "Image do contato",
                            tipo: tipo,
                            nomeAquivo: imagem.fileName ?? `photo.${tipo}`
                        };
                        await contatoImageUpload( resposta.assets[0], imgInfo,
                             imagemCallback, token );
                    }
                }
            }
        } catch ( e ) { 
            console.log("Erro => ", e);
        }
    } 

    const pegarFotoMediaLibray = async () => {
        try { 
            const mediaPermission : MediaLibraryPermissionResponse = await requestMediaLibraryPermissionsAsync();
            if ( mediaPermission.granted ) { 
                const options : ImagePickerOptions = {
                    quality: 0.8,
                    allowsEditing: false,
                    base64: false,
                    mediaTypes : "images"                
                }
                const resposta : ImagePickerResult = await launchImageLibraryAsync(options);
                if (!resposta.canceled) { 
                    if (resposta.assets.length > 0) { 
                        console.log("Dados da imagem selecionada");
                        console.log( resposta.assets );
                        const imagem = resposta.assets[0];
                        const tipo = (imagem.mimeType?.startsWith("image/") ? 
                                            imagem.mimeType.split("/")[1] : imagem.mimeType)?? "jpg";
                        const imgInfo : ImageInfo = { 
                            id: 0,
                            nome: "Foto do contato",
                            descricao: "Image do contato",
                            tipo: tipo,
                            nomeAquivo: imagem.fileName ?? "photo.png"
                        };
                        setImagem( imagem.uri );
                        await contatoImageUpload( resposta.assets[0], imgInfo,
                             imagemCallback, token );
                    }
                }
            }
        } catch (erro) {
            console.log("Erro: ", erro);
        }
    }

    return { loading : query.isLoading || query.isFetching, mensagem, sucesso,
        contato, contatoErro, contatoLista : query.data, imagem,
        salvar, ler, apagar, atualizar, setContato, handleContato, 
        pegarFotoCamera, pegarFotoMediaLibray};
}

export {useContatoControl};