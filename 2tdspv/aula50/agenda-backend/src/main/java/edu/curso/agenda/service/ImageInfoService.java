package edu.curso.agenda.service;

import edu.curso.agenda.exception.ImageInfoException;
import edu.curso.agenda.model.ImageInfo;
import edu.curso.agenda.repository.ImageInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ImageInfoService {

    private final ImageInfoRepository repository;

    public ImageInfoService(ImageInfoRepository repository) {
        this.repository = repository;
    }
    
    public void adicionar(ImageInfo img) throws ImageInfoException {
        try {
            repository.save(img);
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao adicionar a Imagem ", e);
        }
    }

    public List<ImageInfo> listarTodos() throws ImageInfoException {
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao pesquisar os Contatos", e);
        }
    }

    public List<ImageInfo> procurarPorTitulo(String titulo ) throws ImageInfoException {
        try {
            return repository.pesquisarPorTitulo( titulo );
        } catch (Exception e) {
            throw new ImageInfoException("Erro ao pesquisar imagens pelo titulo", e);
        }
    }
}
