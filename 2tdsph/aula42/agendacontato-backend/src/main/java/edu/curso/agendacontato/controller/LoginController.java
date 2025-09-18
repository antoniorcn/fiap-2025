package edu.curso.agendacontato.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import edu.curso.agendacontato.model.Usuario;
import edu.curso.agendacontato.security.JwtServices;

@RestController
@RequestMapping("/login")
public class LoginController { 

    private JwtServices jwtServices;

    public LoginController( JwtServices jwtServices ) { 
        this.jwtServices = jwtServices;
    }

    @PostMapping
    public ResponseEntity<String> logar(@RequestBody Usuario usuario) { 

        System.out.println("Usuario recebido: " + usuario);

        return ResponseEntity.ok(this.jwtServices.generateToken( usuario.getEmail() ));
    }



}