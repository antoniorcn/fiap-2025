import { useState } from "react";
import { Contato, ContatoErro } from "../model/Contato";
import { contatoImageUpload, contatoServicoApagar, contatoServicoAtualizar, contatoServicoLer, contatoServicoSalvar } from "../service/contatoService";
import { ApagarCallback, AtualizarCallback, ImageUploadCallback, LerCallback, SalvarCallback } from "../fetcher/contatoFetcher";
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
    const [contatoLista, setContatoLista] = useState<Contato[]>([]);
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [sucesso, setSucesso] = useState<boolean>(false);
    const [imagem, setImagem] = useState<string | undefined>(undefined);

    const {token} = useProfileControl();

    const navigation = useNavigation<RootScreenNavigationProp>();

    const salvarCallback : SalvarCallback = 
        (success : boolean, msg : string, errosCampos? : ContatoErro) => {
        if (success) { 
            setMensagem("Contato gravado com sucesso");
            ler();
            navigation.navigate("Contato", {screen: "ContatoLista"});
        } else { 
            setMensagem(msg);
            setContatoErro( errosCampos??{} );
        }
        setSucesso(success);
        setLoading(false);
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
        setLoading(false);
    }

    const lerCallback : LerCallback = 
        (success : boolean, msg : string, lista? : Array<Contato>) => {
        console.log("lerCallback() acionado");
        setSucesso(success);
        setMensagem(msg);
        if ( lista ) { 
            setContatoLista( lista );
            console.log("Lista de contatos ==> ", lista);
        }
        setLoading(false);
    } 

    const apagarCallback : ApagarCallback = 
        (success : boolean, msg : string) => {
        console.log("apagarCallback() acionado");
        setSucesso(success);
        if (success) { 
            setMensagem("Contato apagado com sucesso");
        } else { 
            setMensagem(msg);
        }
        setLoading(false);
    } 

    const imagemCallback : ImageUploadCallback = 
        (success : boolean, msg : string) => {
        console.log("imagemCallback() acionado");
        setSucesso(success);
        if (success) { 
            setMensagem("Imagem encaminhada com sucesso");
        } else {
            console.log("Mensagem: ",  msg );
            setMensagem(msg);
        }
        setLoading(false);
    } 
    
    const salvar = () => {
        setLoading(true);
        setContatoErro({});
        if (contato.id == null) {
            contatoServicoSalvar( contato, salvarCallback, token );
        } else { 
            contatoServicoAtualizar( contato.id, contato, atualizarCallback, token );
        }
        navigation.navigate("Contato", {screen: "ContatoLista"});
    }

    const ler = () => { 
        setLoading(true);
        setContatoErro({});
        contatoServicoLer( lerCallback, token );
    }

    const apagar = (id : string) => { 
        setLoading(true);
        setContatoErro({});
        contatoServicoApagar( id, apagarCallback, token);
    }

    const atualizar = (id : string) => { 
        setContatoErro({});
        const contatosFiltrados = contatoLista.filter( 
            (c : Contato)=> c.id == id
        );
        if (contatosFiltrados.length > 0) { 
            setContato( contatosFiltrados[0] );
            navigation.navigate("Contato", { screen: "ContatoFormulario"});
        }
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
                        const imgInfo : ImageInfo = { 
                            id: 0,
                            nome: "Foto do contato",
                            descricao: "Image do contato",
                            tipo: imagem.mimeType ?? "png",
                            nomeAquivo: imagem.fileName ?? "photo.png"
                        };
                        setImagem( imagem.uri );
                        contatoImageUpload( resposta.assets[0], imgInfo, imagemCallback );
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
                        const imgInfo : ImageInfo = { 
                            id: 0,
                            nome: "Foto do contato",
                            descricao: "Image do contato",
                            tipo: imagem.mimeType ?? "png",
                            nomeAquivo: imagem.fileName ?? "photo.png"
                        };
                        setImagem( imagem.uri );
                        contatoImageUpload( resposta.assets[0], imgInfo, imagemCallback );
                    }
                }
            }
        } catch (erro) {
            console.log("Erro: ", erro);
        }
    }

    return { loading, mensagem, sucesso,
        contato, contatoErro, contatoLista, imagem,
        salvar, ler, apagar, atualizar, setContato, handleContato, 
        pegarFotoCamera, pegarFotoMediaLibray};
}

export {useContatoControl};