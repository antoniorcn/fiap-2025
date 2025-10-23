package edu.curso.agendacontato.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import edu.curso.agendacontato.model.Contato;
import edu.curso.agendacontato.repository.ContatoRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/contato")
@CrossOrigin("*")
public class ContatoController {
    Logger logger = LoggerFactory.getLogger(ContatoController.class);
    public static final String IMAGE_PATH = "c:\\temp\\images";
    private ContatoRepository repositorio;

    public ContatoController(ContatoRepository repositorio) { 
        this.repositorio = repositorio;
    }

    @PostMapping
    public ResponseEntity<String> adicionar(@RequestBody Contato contato) {

        logger.debug("Contato recebido: " + contato);
        this.repositorio.save( contato );

        return ResponseEntity.ok("Contato adicionado com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<Contato>> listarTodos() { 

        return ResponseEntity.ok(this.repositorio.findAll());
    }

    @PostMapping(value = "/image", consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(
            @RequestParam("contato_id") Long contatoId,
            @RequestParam("tipo") String tipo,
            @RequestPart("image") MultipartFile image
    ) {
        Optional<Contato> optContato = repositorio.findById( contatoId );
        if (optContato.isPresent()) {
            logger.debug("Contato encontrado");
            Contato contato = optContato.get();

            logger.debug("Arquivo de Imagem (Tipo): " + image.getContentType());
            logger.debug("Arquivo de Imagem (Size): " + image.getSize());
            logger.debug("Arquivo de Imagem (FileName): " + image.getOriginalFilename());

            if (tipo.contains("/")) {
                tipo = tipo.split("/")[1];
            }

            String nomeArquivo = UUID.randomUUID().toString() + "." + tipo;
            logger.debug("ID Gerado " + nomeArquivo);

            Path base = Path.of(IMAGE_PATH);

            try (InputStream in = image.getInputStream()) {
                logger.debug("InputStream acessado");
                Files.copy(in, base.resolve(nomeArquivo));
                logger.debug("Arquivo copiado");
                contato.setImagem( nomeArquivo );
                repositorio.save( contato );
                return ResponseEntity.ok("Imagem salva com sucesso");
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body("Erro ao salvar a imagem");
            }
        } else {
            return ResponseEntity.badRequest().body("Contato não encontrado");
        }
    }
}