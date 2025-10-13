//package edu.curso.agendacontato.controller;
//
//import edu.curso.agendacontato.repository.UsuarioRepository;
//import edu.curso.agendacontato.service.UsuarioService;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.http.ResponseEntity;
//import edu.curso.agendacontato.model.Usuario;
//import edu.curso.agendacontato.security.JwtServices;
//
//@RestController
//@RequestMapping("/login")
//public class LoginController {
//
//    private JwtServices jwtServices;
//    private AuthenticationManager authenticationManager;
//    private UsuarioService service;
//
//    public LoginController(JwtServices jwtServices,
//                           AuthenticationManager authenticationManager,
//                           UsuarioService service) {
//        this.jwtServices = jwtServices;
//        this.authenticationManager = authenticationManager;
//        this.service = service;
//    }
//
//    @PostMapping("/cadastro")
//    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {
//        System.out.println("Usuario recebido: " + usuario);
//        service.cadastrar( usuario );
//        return ResponseEntity.ok(this.jwtServices.generateToken(usuario.getEmail()));
//    }
//
//    @PostMapping
//    public ResponseEntity<String> logar(@RequestBody Usuario usuario) {
//        System.out.println("Usuario recebido: " + usuario);
//        Authentication auth = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken( usuario.getEmail(), usuario.getSenha())
//        );
//        if (auth.isAuthenticated()) {
//            return ResponseEntity.ok(this.jwtServices.generateToken(usuario.getEmail()));
//        } else {
//            throw new UsernameNotFoundException( "Usuario não encontrado ");
//        }
//    }
//
//
//
//}