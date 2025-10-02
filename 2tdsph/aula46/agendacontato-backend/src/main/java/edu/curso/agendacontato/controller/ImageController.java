package edu.curso.agendacontato.controller;

import edu.curso.agendacontato.model.ImageInfo;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class ImageController { 

    @PostMapping(consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(
        @RequestPart("imageInfo") ImageInfo imageInfo,
        @RequestPart("image") MultipartFile image
    ) {

        System.out.println("Image Info");
//        System.out.println("ContatoId: " + imageInfo.getContato());
        System.out.println("Nome: " + imageInfo.getNome());
        System.out.println("Descricao: " + imageInfo.getDescricao());
        System.out.println("Image Tipo: " + imageInfo.getTipo());

        System.out.println("Arquivo de Imagem (Tipo): " + image.getContentType());
        System.out.println("Arquivo de Imagem (Size): " + image.getSize());
        System.out.println("Arquivo de Imagem (FileName): " + image.getOriginalFilename());

        String nomeArquivo = UUID.randomUUID().toString() + "." + imageInfo.getTipo();

        System.out.println("ID Gerado " + nomeArquivo);

        Path base = Path.of("D:\\AntonioMAD\\images");

        try ( InputStream in = image.getInputStream()) {
            System.out.println("InputStream acessado");
            Files.copy(in, base.resolve(nomeArquivo));
            System.out.println("Arquivo copiado");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("Imagem enviada com sucesso");
    }

}