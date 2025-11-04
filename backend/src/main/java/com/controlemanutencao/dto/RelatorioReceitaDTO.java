package com.controlemanutencao.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import com.controlemanutencao.model.Categoria;

public record RelatorioReceitaDTO(LocalDate data, BigDecimal receita, Categoria categoria) {
}
