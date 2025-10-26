package com.controlemanutencao.service;

import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.AtualizarSolicitacaoRequest;
import com.controlemanutencao.repository.CategoriaRepository;
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
    private final CategoriaService categoriaService;
    private final UsuarioService usuarioService;
    private final LogSolicitacaoRepository logRepository;

    public SolicitacaoService(SolicitacaoRepository repository, LogSolicitacaoRepository logRepository, CategoriaService categoriaService, UsuarioService usuarioService) {
        this.repository = repository;
        this.logRepository = logRepository;
        this.categoriaService = categoriaService;
        this.usuarioService = usuarioService;
    }

    public Optional<Solicitacao> findById(Long id) {
        return repository.findById(id);
    }

    public void novaSolicitacao(Solicitacao s) {
        s.setStatus(StatusSolicitacao.NOVA);
        repository.save(s);
    }

    public void atualizarSolicitacao(Usuario user, Solicitacao s, String descricaoDefeito, String descricaoEquipamento, String dthArrumado, Long responsavelId, Long categoriaId, Short status) throws IllegalArgumentException, EstadoIlegalSolicitacaoException, DeveSerFuncionarioException  {
        if(!user.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        Utils.ifNotNull(descricaoDefeito, (x) -> s.setDescricaoDefeito(descricaoDefeito));
        Utils.ifNotNull(descricaoEquipamento, (x) -> s.setDescricaoDefeito(descricaoDefeito));
        if(dthArrumado != null) {
            if(Utils.isFuture(dthArrumado)) {
                throw new IllegalArgumentException("A data de arrumado não pode estar no futuro");
            }
            s.setDataArrumado(Utils.toUnix(dthArrumado));
        }
        if(responsavelId != null) {
            Usuario u = usuarioService.findById(responsavelId).orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado!"));
            if(!u.isFuncionario()) {
                throw new IllegalArgumentException("Responsável deve ser funcionário.");
            }
            s.setResponsavel(u);
        }
        if(categoriaId != null) {
            Categoria u = categoriaService.findById(categoriaId).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada!"));
            s.setCategoria(u);
        }
        if(status != null) {
            StatusSolicitacao statusSolicitacao = StatusSolicitacao.fromId(status);
            if(!List.of(s.getStatus().getProximosStatusPossiveis()).contains(statusSolicitacao)) {
                throw new EstadoIlegalSolicitacaoException("A solicitação não pode ser atualizada para o status informado.");
            }
        }
        repository.save(s);
    }

    public void orcarServico(Solicitacao s, String desc, Double valor, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.APROVADA && s.getStatus() != StatusSolicitacao.REDIRECIONADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível enviar um orçamento nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.ORCADA, agente);
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(new Orcamento(null, valor, desc, Utils.timestampNow()));
        repository.save(s);
    }

    private void salvarLog(Solicitacao s, StatusSolicitacao previous, StatusSolicitacao next, Usuario agente) {
        LogSolicitacao log = new LogSolicitacao(s, previous, next, Utils.timestampNow());
        logRepository.save(log);
    }

    public List<Solicitacao> find(Usuario user, LocalDate de, LocalDate ate, int pagina) {

        ZoneId utcZone = ZoneOffset.UTC;

        Long from = null;
        Long to = null;

        if(de != null) {
            from = de.atStartOfDay(utcZone).toInstant().toEpochMilli();
        }
        if(ate != null) {
            to = ate.atStartOfDay(utcZone).plusDays(1).minusNanos(1).toInstant().toEpochMilli();
        }

        return repository.buscaSolicitacoes(
                from,
                to,
                user.getTipoUsuario() == TipoUsuario.CLIENTE,
                (long) user.getId(),
                PageRequest.of(pagina, 15)
        ).toList();
    }

}
