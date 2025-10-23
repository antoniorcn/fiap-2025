# Guia de Upload Multipart com Boundary Fixo

Este guia mostra como gerar requests multipart manualmente com boundary fixo para upload de imagens.

## Arquivos Criados

1. **`multipart-examples.ts`** - Exemplos completos de implementação
2. **`multipart-debug-example.ts`** - Exemplos para debug e visualização
3. **`fetcher/contatoFetcher.ts`** - Função atualizada com ambas as opções

## Estrutura do Request Multipart

O request multipart tem a seguinte estrutura:

```
--BOUNDARY
Content-Disposition: form-data; name="imageInfo"
Content-Type: application/json

{JSON_DO_IMAGEINFO}

--BOUNDARY
Content-Disposition: form-data; name="image"; filename="arquivo.jpg"
Content-Type: image/jpeg

[DADOS_BINARIOS_DA_IMAGEM]

--BOUNDARY--
```

## Duas Abordagens Implementadas

### 1. Usando FormData (Recomendado)
```typescript
const formData = new FormData();
const imageInfoBlob = new Blob([JSON.stringify(imgInfo)], { 
    type: 'application/json' 
});
formData.append('imageInfo', imageInfoBlob);

const assetData = {
    uri: asset.uri,
    type: asset.mimeType ?? "image/jpeg",
    name: fileName
};
formData.append('image', assetData as any);
```

### 2. Request Manual com Boundary Fixo
```typescript
const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
const multipartBuffer = await generateManualMultipartRequest(asset, imgInfo);

const response = await apiBase.post("/images", multipartBuffer, {
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': multipartBuffer.length.toString(),
    },
});
```

## Como Usar

1. **Para usar FormData**: A função `contatoFetcherImageUpload` já está configurada com FormData
2. **Para usar request manual**: Descomente as linhas 128-138 em `contatoFetcher.ts`

## Debug e Visualização

Use as funções em `multipart-debug-example.ts` para visualizar como seria o request:

```typescript
import { debugMultipartRequest } from './multipart-debug-example';

// Para debug
debugMultipartRequest(asset, imgInfo);
```

## Boundary Fixo

O boundary usado é: `----WebKitFormBoundary7MA4YWxkTrZu0gW`

Este é um boundary padrão que funciona bem com a maioria dos servidores.

## Estrutura do ImageInfo

```typescript
interface ImageInfo { 
    id: number;
    nome: string;
    descricao: string;
    tipo: string;
    nomeAquivo: string;
}
```

## Exemplo de Request HTTP Completo

```
POST /images HTTP/1.1
Host: 10.70.2.52:8080
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Length: [TAMANHO_TOTAL]

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="imageInfo"
Content-Type: application/json

{
  "id": 123,
  "nome": "Foto do Perfil",
  "descricao": "Foto principal do usuário",
  "tipo": "profile",
  "nomeAquivo": "profile.jpg"
}
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="image"; filename="profile.jpg"
Content-Type: image/jpeg

[DADOS_BINARIOS_DA_IMAGEM]
----WebKitFormBoundary7MA4YWxkTrZu0gW--
```
