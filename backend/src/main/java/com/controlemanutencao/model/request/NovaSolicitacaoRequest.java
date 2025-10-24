package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record NovaSolicitacaoRequest (
        @JsonProperty("desc_defeito")
        String descDefeito,
        @JsonProperty("desc_equipamento")
        String descEquipamento,
        @JsonProperty("categoria_id")
        int categoriaId
) {}
