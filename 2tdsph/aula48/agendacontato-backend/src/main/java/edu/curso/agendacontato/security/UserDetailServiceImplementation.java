//package edu.curso.agendacontato.security;
//
//import edu.curso.agendacontato.model.Usuario;
//import edu.curso.agendacontato.repository.UsuarioRepository;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class UserDetailServiceImplementation implements UserDetailsService {
//
//    final private UsuarioRepository repository;
//
//    public UserDetailServiceImplementation( UsuarioRepository repository ) {
//        this.repository = repository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Usuario> user = repository.findByEmail(username);
//        if (user.isPresent()) {
//            return new UserDetailsImpl( user.get() );
//        }
//        return null;
//    }
//}
