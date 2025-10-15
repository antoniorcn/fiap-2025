package edu.curso.agenda.repository;

import edu.curso.agenda.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

//    @Query("Select u From Usuario u Where u.email like %:email%")
//    public Usuario pesquisarPorEmail(@Param("email") String email);

    public Optional<Usuario> findByEmail(String email);
}
