package com.controlemanutencao.controller;

import com.controlemanutencao.dto.SolicitacaoDTO;
import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.AtualizarSolicitacaoRequest;
import com.controlemanutencao.model.request.EnviarOrcamentoRequest;
import com.controlemanutencao.model.request.NovaSolicitacaoRequest;
import com.controlemanutencao.model.request.RedirecionarSolicitacaoRequest;
import com.controlemanutencao.service.CategoriaService;
import com.controlemanutencao.service.SolicitacaoService;
import com.controlemanutencao.service.UsuarioService;
import com.controlemanutencao.utils.Utils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/solicitacao")
public class SolicitacaoController {

    private final SolicitacaoService service;
    private final UsuarioService userService;
    private final CategoriaService catService;

    public SolicitacaoController(SolicitacaoService service, CategoriaService catService, UsuarioService userService) {
        this.catService = catService;
        this.service = service;
        this.userService = userService;
    }

    @GetMapping
    public Response<List<SolicitacaoDTO>> listar(
            @RequestParam(name = "de", required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataDe,
            @RequestParam(name = "ate", required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataAte,
            @RequestParam("page") int pagina,
            @AuthenticationPrincipal Usuario usuario) {
        List<SolicitacaoDTO> solicitacoes = new ArrayList<>();
        for (Solicitacao s : service.find(usuario, dataDe, dataAte, pagina)) {
            List<LogSolicitacao> logs = service.findLogs(s);
            solicitacoes.add(SolicitacaoDTO.from(s, logs));
        }
        return new Response<>(HttpStatus.OK.value(), "", solicitacoes);
    }

    @GetMapping("/{id}")
    public Response<SolicitacaoDTO> buscarPorID(@PathVariable("id") Long id, @AuthenticationPrincipal Usuario usuario) {
        Optional<Solicitacao> solicitacoes = service.findById(usuario, id);
        if(solicitacoes.isEmpty()) {
            return new Response<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Solicitação inexistente.",
                    null
            );
        }
        List<LogSolicitacao> logs = service.findLogs(solicitacoes.get());
        return new Response<>(HttpStatus.OK.value(), "", SolicitacaoDTO.from(solicitacoes.orElse(null), logs));
    }

    @PostMapping
    public Response<?> novaSolicitacao(@RequestBody NovaSolicitacaoRequest req, @AuthenticationPrincipal Usuario usuario) {
        Optional<Categoria> optCat = catService.findById((long) req.categoriaId());
        if(optCat.isEmpty()) {
            return new Response<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Categoria de equipamento desconhecida.",
                    null
            );
        }
        Solicitacao s = new Solicitacao(
                null,
                StatusSolicitacao.NOVA,
                req.descDefeito(),
                req.descEquipamento(),
                Utils.timestampNow(),
                null,
                null,
                usuario,
                optCat.get(), true);
        service.novaSolicitacao(s);
        return new Response<>(HttpStatus.OK.value(), "Solicitação criada com sucesso!", null);
    }

    @PostMapping("/orcamento/{id}")
    public Response<?> enviarOrcamento(@PathVariable("id") Long solicitacaoId, @RequestBody EnviarOrcamentoRequest orcamento, @AuthenticationPrincipal Usuario usuario) {
        Optional<Solicitacao> solicitacao = service.findById(usuario, solicitacaoId);
        if(solicitacao.isEmpty()) {
            return new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null);
        }
        service.orcarServico(solicitacao.get(), orcamento.descricao(), orcamento.valor(), usuario);
        return new Response<>(HttpStatus.OK.value(), "Orçamento enviado com sucesso!", null);
    }

    @PutMapping("/{id}")
    public Response<?> atualizarSolicitacao(@PathVariable("id") Long solicitacaoId, @RequestBody AtualizarSolicitacaoRequest req, @AuthenticationPrincipal Usuario usuario) {
        service.atualizarSolicitacao(usuario, solicitacaoId, req);
        return new Response<>(HttpStatus.OK.value(), "Orçamento enviado com sucesso!", null);
    }

}
