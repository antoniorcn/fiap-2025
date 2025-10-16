// Exemplos de como gerar requests multipart manualmente com boundary fixo

import { ImagePickerAsset } from "expo-image-picker";
import { ImageInfo } from "./model/ImageInfo";

// Função para gerar o corpo do request multipart manualmente
export const generateMultipartBody = (asset: ImagePickerAsset, imgInfo: ImageInfo): string => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const fileName = asset.fileName ?? "photo.png";
    const mimeType = asset.mimeType ?? "image/jpeg";
    
    let multipartBody = '';
    
    // Parte 1: Informações da imagem (JSON)
    multipartBody += `--${boundary}\r\n`;
    multipartBody += `Content-Disposition: form-data; name="imageInfo"\r\n`;
    multipartBody += `Content-Type: application/json\r\n\r\n`;
    multipartBody += JSON.stringify(imgInfo);
    multipartBody += `\r\n`;
    
    // Parte 2: Arquivo da imagem
    multipartBody += `--${boundary}\r\n`;
    multipartBody += `Content-Disposition: form-data; name="image"; filename="${fileName}"\r\n`;
    multipartBody += `Content-Type: ${mimeType}\r\n\r\n`;
    
    // NOTA: Aqui você precisaria inserir os dados binários da imagem
    // Para React Native, você pode usar fetch para ler o arquivo como ArrayBuffer
    multipartBody += `[DADOS_BINARIOS_DA_IMAGEM_AQUI]\r\n`;
    
    // Fechamento do boundary
    multipartBody += `--${boundary}--\r\n`;
    
    return multipartBody;
};

// Função completa para fazer upload com request manual
export const uploadImageWithManualRequest = async (
    asset: ImagePickerAsset, 
    imgInfo: ImageInfo, 
    baseURL: string = "http://10.70.2.52:8080"
): Promise<void> => {
    
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const fileName = asset.fileName ?? "photo.png";
    const mimeType = asset.mimeType ?? "image/jpeg";
    
    try {
        // 1. Primeiro, ler o arquivo da imagem como ArrayBuffer
        const response = await fetch(asset.uri);
        const imageBuffer = await response.arrayBuffer();
        
        // 2. Converter ArrayBuffer para Uint8Array para manipulação
        const imageData = new Uint8Array(imageBuffer);
        
        // 3. Criar o corpo multipart manualmente
        const boundaryBytes = new TextEncoder().encode(`--${boundary}\r\n`);
        const endBoundaryBytes = new TextEncoder().encode(`--${boundary}--\r\n`);
        
        // Calcular tamanho total
        const imageInfoJson = JSON.stringify(imgInfo);
        const imageInfoHeader = `Content-Disposition: form-data; name="imageInfo"\r\nContent-Type: application/json\r\n\r\n${imageInfoJson}\r\n`;
        const imageHeader = `Content-Disposition: form-data; name="image"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
        
        const totalSize = 
            boundaryBytes.length + 
            new TextEncoder().encode(imageInfoHeader).length + 
            boundaryBytes.length + 
            new TextEncoder().encode(imageHeader).length + 
            imageData.length + 
            new TextEncoder().encode('\r\n').length + 
            endBoundaryBytes.length;
        
        // 4. Criar o buffer final
        const finalBuffer = new Uint8Array(totalSize);
        let offset = 0;
        
        // Adicionar primeira parte (imageInfo)
        finalBuffer.set(boundaryBytes, offset);
        offset += boundaryBytes.length;
        
        const imageInfoHeaderBytes = new TextEncoder().encode(imageInfoHeader);
        finalBuffer.set(imageInfoHeaderBytes, offset);
        offset += imageInfoHeaderBytes.length;
        
        // Adicionar segunda parte (image)
        finalBuffer.set(boundaryBytes, offset);
        offset += boundaryBytes.length;
        
        const imageHeaderBytes = new TextEncoder().encode(imageHeader);
        finalBuffer.set(imageHeaderBytes, offset);
        offset += imageHeaderBytes.length;
        
        // Adicionar dados da imagem
        finalBuffer.set(imageData, offset);
        offset += imageData.length;
        
        // Adicionar quebra de linha
        const newlineBytes = new TextEncoder().encode('\r\n');
        finalBuffer.set(newlineBytes, offset);
        offset += newlineBytes.length;
        
        // Adicionar boundary final
        finalBuffer.set(endBoundaryBytes, offset);
        
        // 5. Fazer a requisição
        const uploadResponse = await fetch(`${baseURL}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': totalSize.toString(),
            },
            body: finalBuffer,
        });
        
        if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
        }
        
        console.log('Upload realizado com sucesso!');
        
    } catch (error) {
        console.error('Erro no upload:', error);
        throw error;
    }
};

// Exemplo de como o request ficaria como string (para debug)
export const generateMultipartStringExample = (asset: ImagePickerAsset, imgInfo: ImageInfo): string => {
    const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
    const fileName = asset.fileName ?? "photo.png";
    const mimeType = asset.mimeType ?? "image/jpeg";
    
    return `--${boundary}
Content-Disposition: form-data; name="imageInfo"
Content-Type: application/json

${JSON.stringify(imgInfo)}
--${boundary}
Content-Disposition: form-data; name="image"; filename="${fileName}"
Content-Type: ${mimeType}

[DADOS_BINARIOS_DA_IMAGEM_AQUI]
--${boundary}--`;
};

// Exemplo de uso:
/*
const exampleUsage = async () => {
    const asset: ImagePickerAsset = {
        uri: "file:///path/to/image.jpg",
        fileName: "image.jpg",
        mimeType: "image/jpeg",
        // ... outros campos
    };
    
    const imgInfo: ImageInfo = {
        id: 1,
        nome: "Minha Imagem",
        descricao: "Descrição da imagem",
        tipo: "profile",
        nomeAquivo: "image.jpg"
    };
    
    // Gerar string de exemplo para debug
    const stringExample = generateMultipartStringExample(asset, imgInfo);
    console.log("Exemplo de request multipart:");
    console.log(stringExample);
    
    // Fazer upload real
    try {
        await uploadImageWithManualRequest(asset, imgInfo);
        console.log("Upload realizado com sucesso!");
    } catch (error) {
        console.error("Erro no upload:", error);
    }
};
*/
