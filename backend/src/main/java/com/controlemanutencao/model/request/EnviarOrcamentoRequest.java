package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EnviarOrcamentoRequest (
        double valor,
        String descricao
) { }
