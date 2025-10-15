package edu.curso.agenda.service;

import edu.curso.agenda.dto.UsuarioDTO;
import edu.curso.agenda.model.Usuario;
import edu.curso.agenda.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    private final PasswordEncoder encoder;
    private final UsuarioRepository repository;

    public UsuarioService(PasswordEncoder encoder, UsuarioRepository repository) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public void signup(Usuario usuario) {
        String cryptoSenha = encoder.encode( usuario.getSenha() );
        usuario.setSenha(cryptoSenha);
        repository.save( usuario );
    }

    public Usuario signin(UsuarioDTO usuarioDTO) {
        Optional<Usuario> user = repository.findByEmail(usuarioDTO.getEmail());
        if (user.isPresent()) {
            Usuario usuario = user.get();
            if (encoder.matches(usuarioDTO.getSenha(), usuario.getSenha())) {
                return usuario;
            }
        }
        return null;
    }
}
