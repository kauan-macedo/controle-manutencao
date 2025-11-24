package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AtualizarSolicitacaoRequest (
    @JsonProperty("desc_defeito")
    String descricaoDefeito,

    @JsonProperty("desc_equipamento")
    String descricaoEquipamento,

    @JsonProperty("motivo_rejeicao")
    String motivoRejeicao,

    @JsonProperty("orientacoes_cliente")
    String orientacoesCliente,

    @JsonProperty("desc_manutencao")
    String descManutencao,

    @JsonProperty("responsavel_id")
    Long responsavelId,

    @JsonProperty("categoria_id")
    Long categoriaId,

    @JsonProperty("status")
    Short status
){}
