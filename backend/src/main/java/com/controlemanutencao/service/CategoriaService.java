package com.controlemanutencao.service;

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

    public void novaCategoria(Categoria cat) {
        repository.save(cat);
    }

    public List<Categoria> findAll() {
        return repository.findAll();
    }


}
