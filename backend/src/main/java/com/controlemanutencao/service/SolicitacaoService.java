package com.controlemanutencao.service;

import com.controlemanutencao.exception.AutoRedirecionamentoException;
import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.exception.RecursoNaoEncontradoException;
import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.AtualizarSolicitacaoRequest;
import com.controlemanutencao.model.request.NovaSolicitacaoRequest;
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
import java.util.Arrays;
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

    public void novaSolicitacao(Usuario user, NovaSolicitacaoRequest req) {
        Optional<Categoria> optCat = categoriaService.findById((long) req.categoriaId());
        if(optCat.isEmpty()) {
            throw new RecursoNaoEncontradoException("Categoria desconhecida.");
        }

        if(req.descDefeito().length() > 254) {
            throw new IllegalArgumentException("Descrição de defeito muito longa.");
        }

        if(req.descEquipamento().length() > 254) {
            throw new IllegalArgumentException("Descrição de equipamento muito longa.");
        }

        Solicitacao s = new Solicitacao(
                null,
                StatusSolicitacao.NOVA,
                req.descDefeito(),
                req.descEquipamento(),
                Utils.timestampNow(),
                null,
                null,
                user,
                optCat.get(), true);
        s = repository.save(s);
        salvarLog(s, "Criou a solicitação", user);
    }

    public Solicitacao atualizarSolicitacao(Usuario user, Long idOS, AtualizarSolicitacaoRequest in) throws IllegalArgumentException, EstadoIlegalSolicitacaoException, DeveSerFuncionarioException  {
        if (!user.isFuncionario()
                && in.status() != StatusSolicitacao.REJEITADA.getId()
                && in.status() != StatusSolicitacao.APROVADA.getId()
                && in.status() != StatusSolicitacao.PAGA.getId()) {
            throw new DeveSerFuncionarioException();
        }

        Solicitacao s = repository.findById(idOS).orElseThrow(() -> new IllegalArgumentException("Solicitação não encontrada!"));

        Utils.ifNotNull(in.descricaoDefeito(), (x) -> s.setDescricaoDefeito(in.descricaoDefeito().length() > 255 ? in.descricaoDefeito().substring(0, 255) : in.descricaoDefeito()));
        Utils.ifNotNull(in.motivoRejeicao(), (x) -> s.setMotivoRejeicao(in.motivoRejeicao().length() > 255 ? in.motivoRejeicao().substring(0, 255) : in.motivoRejeicao()));
        Utils.ifNotNull(in.descManutencao(), (x) -> s.setDescricaoManutencao(in.descManutencao().length() > 255 ? in.descManutencao().substring(0, 255) : in.descManutencao()));
        Utils.ifNotNull(in.orientacoesCliente(), (x) -> s.setOrientacoesCliente(in.orientacoesCliente().length() > 255 ? in.orientacoesCliente().substring(0, 255) : in.orientacoesCliente()));
        Utils.ifNotNull(in.descricaoEquipamento(), (x) -> s.setDescricaoEquipamento(in.descricaoEquipamento().length() > 255 ? in.descricaoEquipamento().substring(0, 255) : in.descricaoEquipamento()));
        var redirecionada = false;
        if(in.responsavelId() != null) {
            Usuario u = usuarioService.findById(in.responsavelId()).orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado!"));
            if(!u.isFuncionario()) {
                throw new IllegalArgumentException("Responsável deve ser funcionário.");
            }
            if(in.status() == StatusSolicitacao.REDIRECIONADA.getId()) {
                if(u.getId() == user.getId()) {
                    throw new AutoRedirecionamentoException();
                }
                salvarLog(s, "Redirecionou solicitação para " + u.getNome(), user);
                redirecionada = true;
            }
            s.setResponsavel(u);
        }
        if(in.categoriaId() != null) {
            Categoria u = categoriaService.findById(in.categoriaId()).orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada!"));
            s.setCategoria(u);
        }
        if(in.status() != null && in.status() != s.getStatus().getId()) {
            StatusSolicitacao statusSolicitacao = StatusSolicitacao.fromId(in.status());
            if(!List.of(s.getStatus().getProximosStatusPossiveis()).contains(statusSolicitacao)) {
                throw new EstadoIlegalSolicitacaoException("A solicitação não pode ser atualizada para o status informado.");
            }
            if(statusSolicitacao == StatusSolicitacao.ARRUMADA) {
                s.setDataArrumado(Utils.timestampNow());
                s.setResponsavel(user);
            }
            if(!redirecionada) {
                salvarLog(s, "Mudou situação de " + s.getStatus().getDesc() + " para " + statusSolicitacao.getDesc(), user);
            }
            s.setStatus(statusSolicitacao);
        }
        repository.save(s);
        return s;
    }

    public void orcarServico(Solicitacao s, String desc, Double valor, Usuario agente) throws EstadoIlegalSolicitacaoException {
        if(agente.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            throw new DeveSerFuncionarioException();
        }
        if (s.getStatus() != StatusSolicitacao.NOVA && s.getStatus() != StatusSolicitacao.REDIRECIONADA) {
            throw new AutoRedirecionamentoException();
        }
        salvarLog(s, String.format("Orçou o pedido em R$ %.2f", valor), agente);
        s.setStatus(StatusSolicitacao.ORCADA);
        s.setOrcamento(new Orcamento(null, valor, desc, Utils.timestampNow()));
        repository.save(s);
    }

    private void salvarLog(Solicitacao s, String desc, Usuario agente) {
        LogSolicitacao log = new LogSolicitacao(s, agente, desc, Utils.timestampNow());
        logRepository.save(log);
    }

    public boolean isInteger(String s) {
        if (s == null || s.isBlank()) return false;
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public List<Solicitacao> find(Usuario user, LocalDate de, LocalDate ate, String status, int pagina) {

        List<StatusSolicitacao> validStatus;
        if(status != null) {
            List<String> strStatus = Arrays.stream(status.split(",")).toList();
            strStatus = strStatus.stream().filter(this::isInteger).toList();
            validStatus = strStatus.stream().map(x -> StatusSolicitacao.fromId(Short.parseShort(x))).toList();
        } else {
            validStatus = null;
        }

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
            from, to, user.getTipoUsuario() == TipoUsuario.CLIENTE, (long) user.getId(), validStatus, PageRequest.of(pagina, 9999)
        ).toList().stream()
                .filter(x -> !user.isFuncionario() || (x.getStatus() != StatusSolicitacao.REDIRECIONADA || x.getResponsavel().getId() == user.getId())).toList();
    }

    public List<LogSolicitacao> findLogs(Solicitacao s) {
        return logRepository.findBySolicitacao(s);
    }

}
