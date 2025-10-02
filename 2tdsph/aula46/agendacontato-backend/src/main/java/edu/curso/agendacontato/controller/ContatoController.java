package edu.curso.agendacontato.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import edu.curso.agendacontato.model.Contato;
import edu.curso.agendacontato.repository.ContatoRepository;
import java.util.List;

@RestController
@RequestMapping("/contato")
public class ContatoController { 

    private ContatoRepository repositorio;

    public ContatoController(ContatoRepository repositorio) { 
        this.repositorio = repositorio;
    }

    @PostMapping
    public ResponseEntity<String> adicionar(@RequestBody Contato contato) { 

        System.out.println("Contato recebido: " + contato);
        this.repositorio.save( contato );

        return ResponseEntity.ok("Contato adicionado com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<Contato>> listarTodos() { 

        return ResponseEntity.ok(this.repositorio.findAll());
    }



}