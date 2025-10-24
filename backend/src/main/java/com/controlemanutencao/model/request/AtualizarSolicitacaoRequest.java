package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AtualizarSolicitacaoRequest (
    @JsonProperty("desc_defeito")
    String descricaoDefeito,

    @JsonProperty("desc_equipamento")
    String descricaoEquipamento,

    @JsonProperty("dth_arrumado")
    String dthArrumado,

    @JsonProperty("responsavel_id")
    Long responsavelId,

    @JsonProperty("categoria_id")
    Long categoriaId,

    @JsonProperty("status")
    Short status
){}
