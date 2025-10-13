package edu.curso.agendacontato.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class ImageInfo { 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;

    @Column(length=100)
    private String nome = "";

    @Column(length=255)
    private String descricao = "";

    @Column(length=30)
    private String tipo = "";

    @Column(length=255)
    private String nomeArquivo = "";

//    @ManyToOne
//    private Contato contato;
}