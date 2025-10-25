package edu.curso.agenda.controller;

import edu.curso.agenda.exception.ImageInfoException;
import edu.curso.agenda.model.Contato;
import edu.curso.agenda.service.ContatoService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
public class ImageInfoController {

    private ContatoService service;

    public ImageInfoController(ContatoService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload (
            @RequestParam("contato_id") Long contatoId,
            @RequestParam("tipo") String imageTipo,
            @RequestPart("imagem") MultipartFile arquivo
    ) throws ImageInfoException {
        try {
            Optional<Contato> optContato = service.procurarPorId( contatoId );
            if (optContato.isPresent()) {
                Contato contato = optContato.get();

                Path nomeArquivo = salvarImagem(imageTipo, arquivo);
                contato.setImagem( nomeArquivo.toString() );
                service.atualizar( contato.getId(), contato );
                return ResponseEntity.ok("Imagem Recebida e gravada com sucesso");
            }
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao gravar a imagem", e);
        }
        return ResponseEntity.badRequest().body("Erro ao salvar a imagem");
    }

    public Path salvarImagem(String imageTipo, MultipartFile arquivo ) throws IOException {
        Path base = Path.of("C:\\temp\\imagens");
        UUID nomeArquivo = UUID.randomUUID();
        Path target = base.resolve(nomeArquivo + "." + imageTipo);
        Files.copy( arquivo.getInputStream(), target );
        return target.getFileName();
    }

    @GetMapping("/{contatoId}")
    public ResponseEntity<byte[]> pesquisarImagens(
            @PathVariable("contatoId") Optional<Long> optContatoId) throws ImageInfoException {
        try {
            if (optContatoId.isPresent()) {
                Long contatoId = optContatoId.get();
                Optional<Contato> optContato = service.procurarPorId(contatoId);
                if (optContato.isPresent()) {
                    Contato contato = optContato.get();
                    Path base = Path.of("C:\\temp\\imagens");
                    Path target = base.resolve(contato.getImagem());

                    String fileName = target.getFileName().toString();
                    int lastIndex = fileName.lastIndexOf('.');
                    MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
                    if (lastIndex > 0 && lastIndex < fileName.length() - 1) {
                        String fileExtension = fileName.substring(lastIndex + 1).toLowerCase();
                        if ("jpg".equals(fileExtension) || "jpeg".equals(fileExtension)) {
                            mediaType = MediaType.IMAGE_JPEG;
                        } else if ("png".equals(fileExtension)) {
                            mediaType = MediaType.IMAGE_PNG;
                        } else if ("gif".equals(fileExtension)) {
                            mediaType = MediaType.IMAGE_GIF;
                        }
                    }
                    byte[] imageBytes = Files.readAllBytes(target);
//                    byte[] imageBytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
                    return ResponseEntity.ok().contentType(mediaType).body(imageBytes);
                }
            }
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao carregar a imagem", e);
        }
        return ResponseEntity.badRequest().body("Erro ao carregar a imagem".getBytes());
    }
}
