package edu.curso.agenda.repository;

import edu.curso.agenda.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

    @Query("Select c From Contato c Where c.nome like %:nome%")
    public List<Contato> pesquisarPorNome(@Param("nome") String nome);
}
