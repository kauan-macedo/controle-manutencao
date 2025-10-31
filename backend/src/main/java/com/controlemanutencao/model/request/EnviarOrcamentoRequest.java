package com.controlemanutencao.model.request;

public record EnviarOrcamentoRequest (
        double valor,
        String descricao
) { }
