package edu.curso.agenda.security;

import edu.curso.agenda.model.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailImplementation implements UserDetails {

    private final Usuario usuario;

    public UserDetailImplementation(Usuario usuario ) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] roles = usuario.getPerfil().split(",");
        List<GrantedAuthority> autorities = new ArrayList<>();
        for (String role : roles) {
            autorities.add(new SimpleGrantedAuthority( role ));
        }
        return autorities;
    }

    @Override
    public String getPassword() {
        return usuario.getSenha();
    }

    @Override
    public String getUsername() {
        return usuario.getEmail();
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
