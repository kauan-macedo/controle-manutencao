package com.controlemanutencao.service;

import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.RecursoNaoEncontradoException;
import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.CategoriaRepository;
import com.controlemanutencao.repository.SolicitacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public Optional<Categoria> findById(Long id) {
        return repository.findById(id);
    }

    public void novaCategoria(Usuario u, Categoria cat) {
        if(!u.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        repository.save(cat);
    }

    public void atualizarCategoria(Usuario u, Categoria c) {
        Optional<Categoria> cat = repository.findById(c.getId());
        if(cat.isEmpty()) {
            throw new RecursoNaoEncontradoException("Categoria não encontrada.");
        }
        Categoria categoria = cat.get();
        categoria.setDescricao(c.getDescricao());
        repository.save(categoria);
    }

    public void inativarCategoria(Usuario u, Categoria c) {
        Optional<Categoria> cat = repository.findById(c.getId());
        if(cat.isEmpty()) {
            throw new RecursoNaoEncontradoException("Categoria não encontrada.");
        }
        Categoria categoria = cat.get();
        categoria.setAtivo(false);
        repository.save(categoria);
    }

    public List<Categoria> findAll() {
        return repository.findAllByAtivoTrue();
    }


}
