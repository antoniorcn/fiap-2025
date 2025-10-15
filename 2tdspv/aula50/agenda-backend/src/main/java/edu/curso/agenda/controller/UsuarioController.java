package edu.curso.agenda.controller;

import edu.curso.agenda.dto.SigninDTO;
import edu.curso.agenda.dto.UsuarioDTO;
import edu.curso.agenda.exception.UsuarioException;
import edu.curso.agenda.model.Usuario;
import edu.curso.agenda.service.JwtService;
import edu.curso.agenda.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
public class UsuarioController {

    private final UsuarioService service;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UsuarioController(UsuarioService service,
                             AuthenticationManager authenticationManager,
                             JwtService jwtService) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> adicionar(@RequestBody Usuario usuario) throws UsuarioException {
        service.signup(usuario);
        return ResponseEntity.ok("Usuario adicionado com sucesso");
    }

    @PostMapping("/signin")
    public ResponseEntity<SigninDTO> login(@RequestBody UsuarioDTO usuarioDTO) throws UsernameNotFoundException {
        UsernamePasswordAuthenticationToken userInfo =
                new UsernamePasswordAuthenticationToken(usuarioDTO.getEmail(), usuarioDTO.getSenha());
        Authentication authentication = authenticationManager.authenticate(userInfo);
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(usuarioDTO.getEmail());
            SigninDTO signDTO = new SigninDTO("autenticado", "Autenticado com sucesso");
            signDTO.setToken( token );
            return ResponseEntity.ok( signDTO );
        } else {
            throw new UsernameNotFoundException("Credenciais de usuário incorretas");
        }
    }
}
