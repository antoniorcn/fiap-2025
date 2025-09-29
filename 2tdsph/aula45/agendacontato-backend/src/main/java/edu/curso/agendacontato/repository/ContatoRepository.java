package edu.curso.agendacontato.repository;

import edu.curso.agendacontato.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends 
            JpaRepository<Contato, Long>{ 

}