package edu.curso.agenda.controller;

import edu.curso.agenda.exception.ContatoException;
import edu.curso.agenda.model.Contato;
import edu.curso.agenda.service.ContatoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contato")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
public class ContatoController {

    private final ContatoService service;

    public ContatoController(ContatoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> adicionar(@RequestBody  Contato contato) throws ContatoException {
        service.adicionar( contato );
        return ResponseEntity.ok("Contato adicionado com sucesso");
    }

    @GetMapping
    public ResponseEntity<List<Contato>> pesquisarContatos(@RequestParam("nome") Optional<String> nome) throws ContatoException {
        if (nome.isPresent()) {
            return ResponseEntity.ok(service.procurarPorNome(nome.get()));
        } else {
            return ResponseEntity.ok(service.listarTodos());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> remover(@PathVariable("id") Long id) throws ContatoException {
        service.remover( id );
        return ResponseEntity.ok("Contato removido com sucesso");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable("id") Long id,
                                          @RequestBody Contato contato) throws ContatoException {
        service.atualizar( id, contato );
        return ResponseEntity.ok("Contato atualizado com sucesso");
    }
}
