package com.controlemanutencao.controller;

import com.controlemanutencao.dto.RelatorioReceitaDTO;
import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.repository.SolicitacaoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

    /*private final SolicitacaoRepository solicitacaoRepository;

    public RelatorioController(SolicitacaoRepository solicitacaoRepository) {
        this.solicitacaoRepository = solicitacaoRepository;
    }

    @GetMapping("/receitas")
    public List<RelatorioReceitaDTO> getRelatorioReceitas() {
        List<Solicitacao> solicitacoes = solicitacaoRepository.findAll();

        Map<LocalDate, BigDecimal> receitasPorData = solicitacoes.stream()
                .filter(solicitacao -> solicitacao.getDataArrumado() != null && solicitacao.getOrcamento() != null)
                .collect(Collectors.groupingBy(
                        solicitacao -> Instant.ofEpochMilli(solicitacao.getDataArrumado()).atZone(ZoneId.systemDefault()).toLocalDate(),
                        Collectors.reducing(BigDecimal.ZERO, solicitacao -> BigDecimal.valueOf(solicitacao.getOrcamento().getValor()), BigDecimal::add)
                ));

        return receitasPorData.entrySet().stream()
                .map(entry -> new RelatorioReceitaDTO(entry.getKey(), entry.getValue()))
                .sorted((d1, d2) -> d1.data().compareTo(d2.data()))
                .collect(Collectors.toList());
    }

    @GetMapping("/receitasCategoria")
    public List<RelatorioReceitaDTO> getRelatorioReceitasCategoria(){
        List<Solicitacao> solicitacoes = solicitacaoRepository.findAll();

        Map<Categoria, BigDecimal> receitasPorCategoria = solicitacoes.stream()
            .filter(solicitacao -> solicitacao.getOrcamento() != null && solicitacao.getCategoria() != null)
            .collect(Collectors.groupingBy(
                solicitacao -> solicitacao.getCategoria(),
                Collectors.reducing(BigDecimal.ZERO, solicitacao -> BigDecimal.valueOf(solicitacao.getOrcamento().getValor()), BigDecimal::add)
        ));

        return receitasPorCategoria.entrySet().stream()
            .map(entry -> new RelatorioReceitaDTO(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());
    }*/
}
