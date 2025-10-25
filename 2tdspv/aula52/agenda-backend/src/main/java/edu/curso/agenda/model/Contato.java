package edu.curso.agenda.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length=100)
    private String nome;
    @Column(length=100)
    private String email;
    @Column(length=30)
    private String telefone;
    @Column(length = 255)
    private String imagem;
}