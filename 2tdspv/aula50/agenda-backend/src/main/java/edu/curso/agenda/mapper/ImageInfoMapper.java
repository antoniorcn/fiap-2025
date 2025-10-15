package edu.curso.agenda.mapper;

import edu.curso.agenda.dto.ImageInfoDTO;
import edu.curso.agenda.exception.ContatoException;
import edu.curso.agenda.model.Contato;
import edu.curso.agenda.model.ImageInfo;
import edu.curso.agenda.service.ContatoService;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ImageInfoMapper {
    private final ContatoService contatoService;
    public ImageInfoMapper(ContatoService contatoService) {
        this.contatoService = contatoService;
    }

    public ImageInfoDTO toDTO( ImageInfo img ) { 
        ImageInfoDTO dto = new ImageInfoDTO();
        dto.setTitulo( img.getTitulo() );
        dto.setTipo( img.getTipo() );
        dto.setContatoId( img.getContato().getId() );
        return dto;
    }

    public ImageInfo fromDTO( ImageInfoDTO dto ) throws ContatoException {
        Optional<Contato> contato = contatoService.procurarPorId( dto.getContatoId() );
        if ( contato.isPresent() ) {
            ImageInfo img = new ImageInfo();
            img.setTitulo(dto.getTitulo());
            img.setTipo(dto.getTipo());
            img.setContato(contato.get());
            return img;
        } else {
            throw new ContatoException("Id do contato não localizado");
        }
    }
}