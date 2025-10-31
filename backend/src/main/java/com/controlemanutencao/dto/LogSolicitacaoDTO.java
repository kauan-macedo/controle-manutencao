package com.controlemanutencao.dto;

import com.controlemanutencao.model.LogSolicitacao;
import com.controlemanutencao.utils.Utils;

public record LogSolicitacaoDTO(
    UsuarioDTO agente,
    short statusAnterior,
    short novoStatus,
    String data
) {
    public static LogSolicitacaoDTO from(LogSolicitacao log) {
        return log == null ? null : new LogSolicitacaoDTO(
                UsuarioDTO.from(log.getAgente()),
                log.getStatusAnterior().getId(),
                log.getNovoStatus().getId(),
                Utils.parseMillis(log.getData())
        );
    }
}
