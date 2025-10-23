// Exemplo de como o request multipart ficaria como string para debug
// Este arquivo mostra exatamente como seria o corpo da requisição multipart

import { ImagePickerAsset } from "expo-image-picker";
import { ImageInfo } from "./model/ImageInfo";

// Função para gerar o request multipart como string (para debug)
export const generateMultipartStringForDebug = (asset: ImagePickerAsset, imgInfo: ImageInfo): string => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const fileName = asset.fileName ?? "photo.png";
    const mimeType = asset.mimeType ?? "image/jpeg";
    
    return `--${boundary}
Content-Disposition: form-data; name="imageInfo"
Content-Type: application/json

${JSON.stringify(imgInfo, null, 2)}
--${boundary}
Content-Disposition: form-data; name="image"; filename="${fileName}"
Content-Type: ${mimeType}

[DADOS_BINARIOS_DA_IMAGEM_AQUI - ${fileName}]
--${boundary}--`;
};

// Exemplo de uso com dados reais
export const exampleWithRealData = (): string => {
    const exampleAsset: Partial<ImagePickerAsset> = {
        fileName: "profile.jpg",
        mimeType: "image/jpeg",
        uri: "file:///path/to/profile.jpg"
    };
    
    const exampleImageInfo: ImageInfo = {
        id: 123,
        nome: "Foto do Perfil",
        descricao: "Foto principal do usuário",
        tipo: "profile",
        nomeAquivo: "profile.jpg"
    };
    
    return generateMultipartStringForDebug(exampleAsset as ImagePickerAsset, exampleImageInfo);
};

// Exemplo de como seria o request HTTP completo
export const generateFullHttpRequestExample = (): string => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    
    return `POST /images HTTP/1.1
Host: 10.70.2.52:8080
Content-Type: multipart/form-data; boundary=${boundary}
Content-Length: [TAMANHO_TOTAL_DO_BODY]

--${boundary}
Content-Disposition: form-data; name="imageInfo"
Content-Type: application/json

{
  "id": 123,
  "nome": "Foto do Perfil",
  "descricao": "Foto principal do usuário",
  "tipo": "profile",
  "nomeAquivo": "profile.jpg"
}
--${boundary}
Content-Disposition: form-data; name="image"; filename="profile.jpg"
Content-Type: image/jpeg

[DADOS_BINARIOS_DA_IMAGEM_AQUI]
--${boundary}--`;
};

// Função para testar e visualizar o request
export const debugMultipartRequest = (asset: ImagePickerAsset, imgInfo: ImageInfo): void => {
    console.log("=== DEBUG REQUEST MULTIPART ===");
    console.log("Asset:", asset);
    console.log("ImageInfo:", imgInfo);
    console.log("\n=== CORPO DO REQUEST ===");
    console.log(generateMultipartStringForDebug(asset, imgInfo));
    console.log("\n=== EXEMPLO HTTP COMPLETO ===");
    console.log(generateFullHttpRequestExample());
    console.log("=== FIM DEBUG ===");
};
