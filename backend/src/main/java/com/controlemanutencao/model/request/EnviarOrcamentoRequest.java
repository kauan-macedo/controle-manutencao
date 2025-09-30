package com.controlemanutencao.model.request;

public record EnviarOrcamentoRequest (
        int solicitacao_id,
        double valor,
        String descricao
) { }
