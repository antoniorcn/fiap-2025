package edu.curso.agenda.controller;

import edu.curso.agenda.dto.ImageInfoDTO;
import edu.curso.agenda.exception.ImageInfoException;
import edu.curso.agenda.mapper.ImageInfoMapper;
import edu.curso.agenda.model.ImageInfo;
import edu.curso.agenda.service.ImageInfoService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
public class ImageInfoController {

    private ImageInfoService service;
    private ImageInfoMapper mapper;

    public ImageInfoController(ImageInfoService service, ImageInfoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload (
            @RequestPart("imagemInfo") ImageInfoDTO imgInfoDTO,
            @RequestPart("imagem") MultipartFile arquivo
    ) throws ImageInfoException {
        try {
            ImageInfo imgInfo = mapper.fromDTO(imgInfoDTO);
            service.adicionar(imgInfo);

            service.salvarImagem(imgInfo, arquivo);

            return ResponseEntity.ok("Imagem Recebida com sucesso");
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao gravar a imagem", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<ImageInfo>> pesquisarImagens(
            @RequestParam("titulo") Optional<String> titulo) throws ImageInfoException {
        if (titulo.isPresent()) {
            return ResponseEntity.ok(service.procurarPorTitulo(titulo.get()));
        } else {
            return ResponseEntity.ok(service.listarTodos());
        }
    }
}
