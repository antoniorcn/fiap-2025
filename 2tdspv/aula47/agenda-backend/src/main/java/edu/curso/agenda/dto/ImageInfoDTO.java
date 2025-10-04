package edu.curso.agenda.dto;

import lombok.Data;

@Data
public class ImageInfoDTO {
    private String titulo;
    private String tipo;
    private long contatoId;

    public ImageInfoDTO() { 
        
    }
}