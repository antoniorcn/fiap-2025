package edu.curso.agendacontato.repository;

import edu.curso.agendacontato.model.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends 
            JpaRepository<Usuario, Long>{ 

    public Optional<Usuario> findByEmail(String email);

}