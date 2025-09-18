package edu.curso.agendacontato.security;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import edu.curso.agendacontato.model.Usuario;
import edu.curso.agendacontato.repository.UsuarioRepository;
import io.jsonwebtoken.lang.Arrays;

public class UserDetailServiceImplementation implements UserDetailsService {

    private UsuarioRepository repository;

    public UserDetailServiceImplementation( UsuarioRepository repository ) { 
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> user = repository.findByEmail(username);
        if (user.isPresent()) { 
            return new UserDetails() {

                @Override
                public Collection<? extends GrantedAuthority> getAuthorities() {
                    // TODO Auto-generated method stub

                    GrantedAuthority admin = new GrantedAuthority() {

                        @Override
                        public String getAuthority() {
                            // TODO Auto-generated method stub
                            return "ADMIN";
                        }
                        
                    };
                    
                    return Arrays.asList( new GrantedAuthority[] { admin });
                }

                @Override
                public String getPassword() {
                    // TODO Auto-generated method stub
                    return "";
                }

                @Override
                public String getUsername() {
                    // TODO Auto-generated method stub
                    return username;
                } 

            }
        }
    }
    
}
