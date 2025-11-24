package com.controlemanutencao.dto;

public class RelatorioReceitaCategoriaDTO {
    private String categoria;
    private double receita;

    public RelatorioReceitaCategoriaDTO(String categoria, double receita) {
        this.categoria = categoria;
        this.receita = receita;
    }

    public String getCategoria() {
        return categoria;
    }

    public double getReceita() {
        return receita;
    }
}

