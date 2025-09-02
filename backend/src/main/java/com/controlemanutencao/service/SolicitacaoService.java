package com.controlemanutencao.service;

import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.SolicitacaoRepository;
import com.controlemanutencao.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository repository;

    public SolicitacaoService(SolicitacaoRepository repository) {
        this.repository = repository;
    }

    public Optional<Solicitacao> findById(Long id) {
        return repository.findById(id);
    }

    public List<Solicitacao> findAll() {
        return repository.findAll();
    }

}
