package edu.curso.agenda.security;

import edu.curso.agenda.model.Usuario;
import edu.curso.agenda.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class UserDetailServiceImplementation implements UserDetailsService {

    private UsuarioRepository repository;

    public UserDetailServiceImplementation(UsuarioRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> user = repository.findByEmail( username );
        if (user.isPresent()) {
            return new UserDetailImplementation(user.get());
        } else {
            throw new UsernameNotFoundException("Usuario não encontrado");
        }
    }
}
