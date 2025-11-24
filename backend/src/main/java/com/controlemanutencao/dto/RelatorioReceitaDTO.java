package com.controlemanutencao.dto;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class RelatorioReceitaDTO {
    private String data;
    private double receita;

    public RelatorioReceitaDTO(String date, Double receita) {
        this.data = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0];
        this.receita = receita == null ? 0d : receita;
    }

    public String getData() {
        return data;
    }

    public double getReceita() {
        return receita;
    }
}
