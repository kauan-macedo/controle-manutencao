package com.controlemanutencao.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.controlemanutencao.model.Categoria;

public record RelatorioReceitaCategoriaDTO(
        Categoria categoria,
        BigDecimal receita
) { }
