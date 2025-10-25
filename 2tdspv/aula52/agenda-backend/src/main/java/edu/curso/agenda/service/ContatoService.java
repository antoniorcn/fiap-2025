package edu.curso.agenda.service;

import edu.curso.agenda.exception.ContatoException;
import edu.curso.agenda.model.Contato;
import edu.curso.agenda.repository.ContatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContatoService {

    private final ContatoRepository repository;

    public ContatoService(ContatoRepository repository) {
        this.repository = repository;
    }
    
    public void adicionar(Contato contato) throws ContatoException {
        try {
            repository.save(contato);
        } catch (Exception e) {
            throw new ContatoException("Erro ao adicionar o Contato ", e);
        }
    }

    public List<Contato> listarTodos() throws ContatoException {
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new ContatoException("Erro ao pesquisar os Contatos", e);
        }
    }

    public List<Contato> procurarPorNome( String nome ) throws ContatoException {
        try {
            return repository.pesquisarPorNome( nome );
        } catch (Exception e) {
            throw new ContatoException("Erro ao pesquisar contatos pelo nome", e);
        }
    }

    public Optional<Contato> procurarPorId(long id ) throws ContatoException {
        try {
            return repository.findById( id );
        } catch (Exception e) {
            throw new ContatoException("Erro ao pesquisar contatos pelo id", e);
        }
    }

    public void remover( long id ) throws ContatoException {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            throw new ContatoException("Erro ao remover o Contato ", e);
        }

    }

    public void atualizar( long id, Contato c) throws ContatoException {
        try {
            c.setId( id );
            repository.save( c );
        } catch (Exception e) {
            throw new ContatoException("Erro ao atualizar o Contato ", e);
        }

    }
}
