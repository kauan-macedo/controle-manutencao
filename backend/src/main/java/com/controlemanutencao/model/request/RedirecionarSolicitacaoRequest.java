package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RedirecionarSolicitacaoRequest(
        @JsonProperty("usuario_destino") long usuarioDestino
) { }
