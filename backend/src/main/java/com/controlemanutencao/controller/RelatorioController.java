package com.controlemanutencao.controller;

import com.controlemanutencao.dto.RelatorioReceitaDTO;
import com.controlemanutencao.dto.RelatorioReceitaCategoriaDTO;
import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.SolicitacaoRepository;
import com.controlemanutencao.service.SolicitacaoService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private final SolicitacaoService service;

    public RelatorioController(SolicitacaoService service) {
        this.service = service;
    }

    @GetMapping("/receitas")
    public Response<List<RelatorioReceitaDTO>> getRelatorioReceitas(
            @RequestParam(name = "de", required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataDe,
            @RequestParam(name = "ate", required = false) @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataAte,
            @AuthenticationPrincipal Usuario u
            ) {
        List<RelatorioReceitaDTO> solicitacoes = service.findRelatorioPorData(u, dataDe, dataAte);
        return new Response<>(200, "", solicitacoes);
    }

    @GetMapping("/receitasCategoria")
    public Response<List<RelatorioReceitaCategoriaDTO>> getRelatorioReceitasCategoria(@AuthenticationPrincipal Usuario u){
        List<RelatorioReceitaCategoriaDTO> solicitacoes = service.findRelatorioCategorias(u);
        return new Response<>(200, "", solicitacoes);
    }
}
