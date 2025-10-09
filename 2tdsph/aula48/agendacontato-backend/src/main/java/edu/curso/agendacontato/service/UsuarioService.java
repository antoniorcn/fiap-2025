//package edu.curso.agendacontato.service;
//
//import edu.curso.agendacontato.model.Usuario;
//import edu.curso.agendacontato.repository.UsuarioRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UsuarioService {
//
//    private UsuarioRepository repository;
//    private PasswordEncoder encoder;
//
//    public UsuarioService(UsuarioRepository repository, PasswordEncoder encoder) {
//        this.repository = repository;
//        this.encoder = encoder;
//    }
//
//    public void cadastrar( Usuario usuario ) {
//        String cryptoPass = encoder.encode(usuario.getSenha());
//        usuario.setSenha( cryptoPass );
//        repository.save( usuario );
//    }
//
//    public boolean compararSenhas( String senhaPlain, String senhaCrypto ) {
//        return encoder.matches(senhaPlain, senhaCrypto);
//    }
//
//}