package com.controlemanutencao.controller;

import com.controlemanutencao.model.*;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
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
    public Response<List<Solicitacao>> listar(
            @RequestParam("de") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataDe,
            @RequestParam("ate") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataAte,
            @RequestParam("page") int pagina,
            @RequestParam("hoje") boolean hoje,
            @AuthenticationPrincipal Usuario usuario) {

        List<Solicitacao> solicitacoes = service.find(usuario, hoje, dataDe, dataAte, pagina);
        return new Response<>(200, "", solicitacoes);
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
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Solicitação criada com sucesso!", null));
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

    @PostMapping("/redirecionar/{id}")
    public ResponseEntity<Response<?>> redirecionarServico(@RequestParam long solicitacao_id, @RequestBody RedirecionarSolicitacaoRequest req, @AuthenticationPrincipal Usuario user) {
        Optional<Solicitacao> solicitacao = service.findById(solicitacao_id);
        if(solicitacao.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Solicitação não encontrada!", null));
        }
        Optional<Usuario> destino = userService.findById(req.usuario_destino());
        if(destino.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.BAD_REQUEST.value(), "Usuário de destino não encontrado!", null));
        }
        service.redirecionarServico(solicitacao.get(), user, destino.get());
        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Serviço redirecionado com sucesso!", null));
    }



}
