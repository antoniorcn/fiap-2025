package edu.curso.agenda.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public long id;
    @Column(length=100)
    public String email;
    @Column(length=255)
    public String senha;
    @Column(length=100)
    public String nome;
    @Column(length=255)
    public String perfil;
}
