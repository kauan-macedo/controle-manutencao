package com.controlemanutencao.controller;

import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.EnviarOrcamentoRequest;
import com.controlemanutencao.model.request.NovaSolicitacaoRequest;
import com.controlemanutencao.service.CategoriaService;
import com.controlemanutencao.service.SolicitacaoService;
import com.controlemanutencao.service.UsuarioService;
import com.controlemanutencao.utils.Utils;
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
                Utils.timestampNow(),
                null,
                null,
                usuario,
                optCat.get());
        service.novaSolicitacao(s);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Solicitação criada com sucesso!", service.findByUsuario(usuario)));
    }

    @PostMapping("/orcar/{id}")
    public ResponseEntity<Response<?>> enviarOrcamento(@PathVariable("id") long solicitacao_id, @RequestBody EnviarOrcamentoRequest orcamento, @AuthenticationPrincipal Usuario usuario) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        Orcamento orc = new Orcamento(null, orcamento.valor(), orcamento.descricao(), Utils.timestampNow());
        service.orcarServico(solicitacao.get(), orc, usuario);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Orçamento enviado com sucesso!", null));
    }

    @PostMapping("/aprovar/{id}")
    public ResponseEntity<Response<?>> aprovarServico(@PathVariable("id") long solicitacao_id, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        service.aprovarServico(solicitacao.get(), user);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Serviço aprovado com sucesso!", null));
    }


    @PostMapping("/rejeitar/{id}")
    public ResponseEntity<Response<?>> rejeitarServico(@PathVariable("id") long solicitacao_id, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        service.rejeitarServico(solicitacao.get(), user);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Serviço aprovado com sucesso!", null));
    }

    @PostMapping("/resgatar/{id}")
    public ResponseEntity<Response<?>> resgatarServico(@PathVariable("id") long solicitacao_id, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        service.rejeitarServico(solicitacao.get(), user);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Serviço resgatado com sucesso!", null));
    }

    @PostMapping("/arrumar/{id}")
    public ResponseEntity<Response<?>> arrumarServico(@PathVariable("id") long solicitacao_id, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        service.rejeitarServico(solicitacao.get(), user);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Equipamento arrumado com sucesso!", null));
    }


    @PostMapping("/pagar/{id}")
    public ResponseEntity<Response<?>> pagarServico(@PathVariable("id") long solicitacao_id, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        service.rejeitarServico(solicitacao.get(), user);
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Serviço pago com sucesso!", null));
    }

    @PostMapping("/redirecionar")
    public ResponseEntity<Response<?>> redirecionarServico(@RequestParam int solicitacao_id, @AuthenticationPrincipal Usuario user) {
        return null;
    }



}
