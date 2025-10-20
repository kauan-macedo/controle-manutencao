package com.controlemanutencao.service;

import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.repository.LogSolicitacaoRepository;
import com.controlemanutencao.repository.SolicitacaoRepository;
import org.springframework.data.domain.Pageable;
import com.controlemanutencao.utils.Utils;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.*;
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
        repository.save(s);
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
        repository.save(s);
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
        repository.save(s);
    }

    public void redirecionarServico(Solicitacao s, Usuario de, Usuario para) throws EstadoIlegalSolicitacaoException {
        if(de.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if(para.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.ORCADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível redirecionar o serviço nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.REDIRECIONADA, de);
        s.setStatus(StatusSolicitacao.REDIRECIONADA);
        repository.save(s);
    }

    public void orcarServico(Solicitacao s, Orcamento orcamento, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.APROVADA && s.getStatus() != StatusSolicitacao.REDIRECIONADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível enviar um orçamento nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.ORCADA, agente);
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(orcamento);
        repository.save(s);
    }

    private void salvarLog(Solicitacao s, StatusSolicitacao previous, StatusSolicitacao next, Usuario agente) {
        LogSolicitacao log = new LogSolicitacao(s, previous, next, Utils.timestampNow());
        logRepository.save(log);
    }

    public List<Solicitacao> find(Usuario user, boolean hoje, LocalDate de, LocalDate ate, int pagina) {

        ZoneId utcZone = ZoneOffset.UTC;

        Long from = null;
        Long to = null;

        if(hoje) {
            LocalDate hojeUTC = LocalDate.now(utcZone);
            ZonedDateTime inicioDoDiaUTC = hojeUTC.atStartOfDay(utcZone);
            ZonedDateTime fimDoDiaUTC = hojeUTC
                    .atTime(LocalTime.MAX)
                    .atZone(utcZone);
            from = inicioDoDiaUTC.toInstant().toEpochMilli();
            to = fimDoDiaUTC.toInstant().toEpochMilli() - 1;
        } else {
            if(de != null) {
                from = de.atStartOfDay(utcZone).toInstant().toEpochMilli();
            }
            if(ate != null) {
                to = ate.atStartOfDay(utcZone).toInstant().toEpochMilli();
            }
        }

        return repository.buscaSolicitacoes(
                from,
                to,
                user.getTipoUsuario() == TipoUsuario.CLIENTE,
                (long) user.getId(),
                (Pageable) PageRequest.of(pagina, 15)
        ).toList();
    }

}
