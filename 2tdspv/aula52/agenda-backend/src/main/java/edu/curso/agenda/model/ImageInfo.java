package edu.curso.agenda.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ImageInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length=100)
    private String titulo;
    @Column(length=100)
    private String tipo;
    @ManyToOne
    private Contato contato;
}