package com.controlemanutencao.service;

import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.repository.LogSolicitacaoRepository;
import com.controlemanutencao.repository.SolicitacaoRepository;
import com.controlemanutencao.repository.UsuarioRepository;
import com.controlemanutencao.utils.Utils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolicitacaoService {

    private final SolicitacaoRepository repository;
    private final LogSolicitacaoRepository logRepository;

    public SolicitacaoService(SolicitacaoRepository repository, LogSolicitacaoRepository logRepository) {
        this.repository = repository;
        this.logRepository = logRepository;
    }

    public Optional<Solicitacao> findById(Long id) {
        return repository.findById(id);
    }

    public List<Solicitacao> findByUsuario(Usuario u) {
        return repository.findByUsuario(u);
    }

    public void novaSolicitacao(Solicitacao s) {
        salvarLog(s, null, StatusSolicitacao.NOVA, null);
        s.setStatus(StatusSolicitacao.NOVA);
        repository.save(s);
    }

    public void rejeitarServico(Solicitacao s, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.NOVA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível rejeitar o serviço nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.REJEITADA, agente);
        s.setStatus(StatusSolicitacao.REJEITADA);
    }

    public void aprovarServico(Solicitacao s, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.NOVA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível aprovar o serviço nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.APROVADA, agente);
        s.setStatus(StatusSolicitacao.APROVADA);
    }

    public void resgatarServico(Solicitacao s, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.REJEITADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível resgatar o serviço nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.APROVADA, agente);
        s.setStatus(StatusSolicitacao.APROVADA);
    }

    public void orcarServico(Solicitacao s, Orcamento orcamento, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.APROVADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível enviar um orçamento nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.ORCADA, agente);
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(orcamento);
    }

    private void salvarLog(Solicitacao s, StatusSolicitacao previous, StatusSolicitacao next, Usuario agente) {
        LogSolicitacao log = new LogSolicitacao(s, previous, next, Utils.timestampNow());
        logRepository.save(log);
    }

    public List<Solicitacao> findAll() {
        return repository.findAll();
    }

}
