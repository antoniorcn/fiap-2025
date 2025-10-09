//package edu.curso.agendacontato.security;
//
//import edu.curso.agendacontato.model.Usuario;
//import java.util.Arrays;
//import java.util.Collection;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//class UserDetailsImpl implements UserDetails {
//    final private Usuario usuario;
//
//    public UserDetailsImpl( Usuario usuario ) {
//        this.usuario = usuario;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        GrantedAuthority admin = new GrantedAuthority() {
//            @Override
//            public String getAuthority() {
//                // TODO Auto-generated method stub
//                return "ADMIN";
//            }
//        };
//        return Arrays.asList( new GrantedAuthority[] { admin });
//    }
//
//    @Override
//    public String getPassword() {
//        return usuario.getSenha();
//    }
//
//    @Override
//    public String getUsername() {
//        return usuario.getEmail();
//    }
//}