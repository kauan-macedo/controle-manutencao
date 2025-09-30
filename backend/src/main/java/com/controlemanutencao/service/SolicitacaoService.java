package com.controlemanutencao.service;

import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.model.Orcamento;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.enums.StatusSolicitacao;
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

    public List<Solicitacao> findByUsuario(Usuario u) {
        return repository.findByUsuario(u);
    }

    public void novaSolicitacao(Solicitacao s) {
        repository.save(s);
    }

    public void rejeitarServico(Solicitacao s) throws EstadoIlegalSolicitacaoException {
        if (s.getStatus() != StatusSolicitacao.NOVA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível rejeitar o serviço nessa etapa.");
        }
        s.setStatus(StatusSolicitacao.REJEITADA);
    }

    public void aprovarServico(Solicitacao s) throws EstadoIlegalSolicitacaoException {
        if (s.getStatus() != StatusSolicitacao.NOVA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível aprovar o serviço nessa etapa.");
        }
        s.setStatus(StatusSolicitacao.APROVADA);
    }

    public void resgatarServico(Solicitacao s) throws EstadoIlegalSolicitacaoException {
        if (s.getStatus() != StatusSolicitacao.REJEITADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível resgatar o serviço nessa etapa.");
        }
        s.setStatus(StatusSolicitacao.NOVA);
    }

    public void enviarOrcamento(Solicitacao s, Orcamento orcamento) throws EstadoIlegalSolicitacaoException {
        if (s.getStatus() != StatusSolicitacao.APROVADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível enviar um orçamento nessa etapa.");
        }
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(orcamento);
    }

    public List<Solicitacao> findAll() {
        return repository.findAll();
    }

}
