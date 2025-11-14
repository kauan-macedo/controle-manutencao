package com.controlemanutencao.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record RelatorioReceitaDTO(
        LocalDate data,
        BigDecimal receita
) { }
