package com.controlemanutencao.controller;

import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.EnviarOrcamentoRequest;
import com.controlemanutencao.model.request.NovaSolicitacaoRequest;
import com.controlemanutencao.service.CategoriaService;
import com.controlemanutencao.service.SolicitacaoService;
import com.controlemanutencao.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/solicitacao")
public class SolicitacaoController {

    private final SolicitacaoService service;
    private final CategoriaService catService;

    public SolicitacaoController(SolicitacaoService service, CategoriaService catService) {
        this.catService = catService;
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Response<List<Solicitacao>>> listar(@AuthenticationPrincipal Usuario usuario) {
        if(usuario.getTipoUsuario() == TipoUsuario.FUNCIONARIO) {
            return ResponseEntity.ofNullable(new Response<>(
                    HttpStatus.OK.value(),
                    "Autocadastro realizado com sucesso!",
                    service.findAll()
            ));
        }
        return ResponseEntity.ofNullable(new Response<>(
                HttpStatus.OK.value(),
                "Autocadastro realizado com sucesso!",
                service.findByUsuario(usuario)
        ));
    }

    @PostMapping
    public ResponseEntity<Response<?>> novaSolicitacao(@RequestBody NovaSolicitacaoRequest req, @AuthenticationPrincipal Usuario usuario) {
        Optional<Categoria> optCat = catService.findById((long) req.categoria_id());
        if(optCat.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Categoria de equipamento desconhecida.",
                    null
            ));
        }
        Solicitacao s = new Solicitacao(
                null,
                StatusSolicitacao.NOVA,
                req.desc_defeito(),
                req.desc_equipamento(),
                System.currentTimeMillis()/1000,
                null,
                null,
                usuario,
                optCat.get());
        service.novaSolicitacao(s);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Solicitação criada com sucesso!", service.findByUsuario(usuario)));
    }

    @PostMapping("/orcamento")
    public ResponseEntity<Response<?>> enviarOrcamento(@RequestBody EnviarOrcamentoRequest orcamento, @AuthenticationPrincipal Usuario usuario) {

        if(usuario.getTipoUsuario() != TipoUsuario.FUNCIONARIO) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.UNAUTHORIZED.value(), "Você não tem permissão para fazer isso.", null));
        }

        Optional<Solicitacao> solicitacao = service.findById((long) orcamento.solicitacao_id());

        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }

        Orcamento orc = new Orcamento(null, orcamento.valor(), orcamento.descricao(), System.currentTimeMillis()/1000);

        service.enviarOrcamento(solicitacao.get(), orc);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Orçamento enviado com sucesso!", null));
    }

    @PostMapping("/aprovar")
    public Response<Response<?>> aprovarServico(@RequestParam int solicitacao_id, @AuthenticationPrincipal Usuario user) {
        return null;
    }

    @PostMapping("/rejeitar")
    public Response<Response<?>> rejeitarServico(@RequestParam int solicitacao_id, @AuthenticationPrincipal Usuario user) {
        return null;
    }

    @PostMapping("/resgatar")
    public Response<Response<?>> resgatarServico(@RequestParam int solicitacao_id, @AuthenticationPrincipal Usuario user) {
        return null;
    }

    @PostMapping("/pagar")
    public Response<Response<?>> pagarServico(@RequestParam int solicitacao_id, @AuthenticationPrincipal Usuario user) {
        return null;
    }



}
