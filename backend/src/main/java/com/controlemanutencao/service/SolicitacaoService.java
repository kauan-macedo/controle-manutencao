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

    public Optional<Solicitacao> findById(Usuario user, Long id) {
        return repository.findByIdWithUser(user, id, user.isFuncionario());
    }

    public void novaSolicitacao(Usuario user, Solicitacao s) {
        s.setStatus(StatusSolicitacao.NOVA);
        salvarLog(s, null, StatusSolicitacao.NOVA, user);
        repository.save(s);
    }

    public void atualizarSolicitacao(Usuario user, Long idOS, AtualizarSolicitacaoRequest in) throws IllegalArgumentException, EstadoIlegalSolicitacaoException, DeveSerFuncionarioException  {
        if (!user.isFuncionario()
                && in.status() != StatusSolicitacao.REJEITADA.getId()
                && in.status() != StatusSolicitacao.APROVADA.getId()) {
            throw new DeveSerFuncionarioException();
        }

        Solicitacao s = repository.findById(idOS).orElseThrow(() -> new IllegalArgumentException("Solicitação não encontrada!"));

        Utils.ifNotNull(in.descricaoDefeito(), (x) -> s.setDescricaoDefeito(in.descricaoDefeito()));
        Utils.ifNotNull(in.descManutencao(), (x) -> s.setDescricaoManutencao(in.descManutencao()));
        Utils.ifNotNull(in.orientacoesCliente(), (x) -> s.setOrientacoesCliente(in.orientacoesCliente()));
        Utils.ifNotNull(in.descricaoEquipamento(), (x) -> s.setDescricaoEquipamento(in.descricaoEquipamento()));
        if(in.responsavelId() != null) {
            Usuario u = usuarioService.findById(in.responsavelId()).orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado!"));
            if(!u.isFuncionario()) {
                throw new IllegalArgumentException("Responsável deve ser funcionário.");
            }
            s.setResponsavel(u);
        }
        if(in.categoriaId() != null) {
            Categoria u = categoriaService.findById(in.categoriaId()).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada!"));
            s.setCategoria(u);
        }
        if(in.status() != null && in.status() != s.getStatus().getId()) {
            StatusSolicitacao statusSolicitacao = StatusSolicitacao.fromId(in.status());
            if(statusSolicitacao == StatusSolicitacao.ARRUMADA) {
                s.setDataArrumado(Utils.timestampNow());
                s.setResponsavel(user);
            }
            if(!List.of(s.getStatus().getProximosStatusPossiveis()).contains(statusSolicitacao)) {
                throw new EstadoIlegalSolicitacaoException("A solicitação não pode ser atualizada para o status informado.");
            }
            salvarLog(s, s.getStatus(), statusSolicitacao, user);
            s.setStatus(statusSolicitacao);
        }
        repository.save(s);
    }

    public void orcarServico(Solicitacao s, String desc, Double valor, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.NOVA && s.getStatus() != StatusSolicitacao.REDIRECIONADA) {
            throw new EstadoIlegalSolicitacaoException("Não é possível enviar um orçamento nessa etapa.");
        }
        salvarLog(s, s.getStatus(), StatusSolicitacao.ORCADA, agente);
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(new Orcamento(null, valor, desc, Utils.timestampNow()));
        repository.save(s);
    }

    private void salvarLog(Solicitacao s, StatusSolicitacao previous, StatusSolicitacao next, Usuario agente) {
        LogSolicitacao log = new LogSolicitacao(s, agente, previous, next, Utils.timestampNow());
        logRepository.save(log);
    }

    public List<Solicitacao> find(Usuario user, LocalDate de, LocalDate ate, StatusSolicitacao status, int pagina) {

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
            from, to, user.getTipoUsuario() == TipoUsuario.CLIENTE, (long) user.getId(), status, PageRequest.of(pagina, 9999)
        ).toList().stream().filter(x -> !user.isFuncionario() || (x.getStatus() != StatusSolicitacao.REDIRECIONADA || x.getResponsavel().getId() == user.getId())).toList();
    }

    public List<LogSolicitacao> findLogs(Solicitacao s) {
        return logRepository.findBySolicitacao(s);
    }

}
