package edu.curso.agendacontato.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import edu.curso.agendacontato.model.Contato;
import edu.curso.agendacontato.repository.ContatoRepository;
import java.util.List;

@RestController
@RequestMapping("/health")
@CrossOrigin("*")
public class HealthController { 
    @GetMapping
    public ResponseEntity<String> isHealth() { 

        return ResponseEntity.ok("{\"status\": \"ok\"}");
    }
}
