package com.controlemanutencao.model.request;

public record NovaSolicitacaoRequest (
        String desc_defeito,
        String desc_equipamento,
        int categoria_id
) {}
